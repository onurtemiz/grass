const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Lesson = require('../models/lesson');
const Teacher = require('../models/teacher');
const Comment = require('../models/comment');
const User = require('../models/user');
const bcrypt = require('bcrypt');

afterAll(async () => {
  await Lesson.deleteMany({});
  await Teacher.deleteMany({});
  await Comment.deleteMany({});
  mongoose.connection.close();
});

const baseUrl = '/api/comments';
const email = 'onurtemiz@boun.edu.tr';
const password = '123456789';

describe('when dealing with multiple comments', () => {
  let perLesson = 5;
  let users = 3;
  beforeAll(async () => {
    await helper.createFakeDb();
    await helper.createFakeUsers(users);
    for (let i = 0; i < users; i++) {
      let user = await helper.loginUser({
        email: `o${i}@boun.edu.tr`,
        password: '123456789',
      });
      let teacher = await Teacher.findOne({
        name: { $regex: 'TARIH', $options: 'i' },
      }).skip(i);
      let lesson = await Lesson.findOne({ teacher: teacher._id });
      await helper.createFakeComments(perLesson, teacher._id, lesson._id, user);
      lesson = await Lesson.findOne({ teacher: teacher._id }).skip(1);
      await helper.createFakeComments(perLesson, teacher._id, lesson._id, user);
    }
  });
  afterAll(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
    await Comment.deleteMany({});
  });

  describe('when getting comments', () => {
    test('should get all comments', async () => {
      const totalComments = await Comment.find().countDocuments();
      const res = await api.get(`${baseUrl}`);
      expect(res.body.length).toEqual(totalComments);
    });
  });

  describe('when getting total comments', () => {
    test('should get total if userId presents', async () => {
      const user = await User.findOne({ email: 'o0@boun.edu.tr' });
      const dbCommentCount = await Comment.find({
        user: user._id,
      }).countDocuments();
      const total = await api
        .get(`${baseUrl}/total?id=${user._id}`)
        .expect(200);
      expect(total.body.total).toBeDefined();
      expect(total.body.total).toEqual(dbCommentCount);
    });

    test('should get total if lessonId presents', async () => {
      const teacher = await Teacher.findOne({
        name: { $regex: 'TARIH', $options: 'i' },
      });
      const lesson = await Lesson.findOne({ teacher: teacher._id });
      const dbCommentCount = await Comment.find({
        lesson: lesson._id,
      }).countDocuments();
      const total = await api
        .get(`${baseUrl}/total?id=${lesson._id}`)
        .expect(200);
      expect(total.body.total).toBeDefined();
      expect(total.body.total).toEqual(dbCommentCount);
    });

    test('should get total if teacherId presents', async () => {
      const teacher = await Teacher.findOne({
        name: { $regex: 'TARIH', $options: 'i' },
      });
      const dbCommentCount = await Comment.find({
        teacher: teacher._id,
      }).countDocuments();
      const total = await api
        .get(`${baseUrl}/total?id=${teacher._id}`)
        .expect(200);
      expect(total.body.total).toBeDefined();
      expect(total.body.total).toEqual(dbCommentCount);
    });

    test('should get total comments if no search presents', async () => {
      const dbCommentCount = await Comment.find().countDocuments();
      const total = await api.get(`${baseUrl}/total`).expect(200);
      expect(total.body.total).toBeDefined();
      expect(total.body.total).toEqual(dbCommentCount);
    });
  });
});

describe('when crud single comment', () => {
  beforeAll(async () => {
    await Lesson.deleteMany({});
    await Teacher.deleteMany({});
    await Comment.deleteMany({});
    await User.deleteMany({});
    let user = {
      email: 'onurtemiz@boun.edu.tr',
      password: '123456789',
      username: 'temizonur',
    };
    let userTwo = {
      email: 'onur@boun.edu.tr',
      password: '123456789',
      username: 'onur',
    };

    await helper.signupUser(user);
    await helper.signupUser(userTwo);

    await helper.createFakeDb();
  });
  describe('when updating a comment', () => {
    beforeEach(async () => {
      await Comment.deleteMany({});
      let lesson = await Lesson.findOne();
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`);
    });

    test('should dislike comment', async () => {
      let comment = await Comment.findOne({});
      let user = await helper.loginUser({
        email,
        password,
      });
      expect(comment.likes.length).toEqual(1);
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
      comment = await Comment.findOne({});
      expect(comment.likes.length).toEqual(0);
    });

    test('should like comment', async () => {
      let comment = await Comment.findOne({});
      let user = await helper.loginUser({
        email: 'onur@boun.edu.tr',
        password: '123456789',
      });
      expect(comment.likes.length).toEqual(1);
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
      comment = await Comment.findOne({});
      expect(comment.likes.length).toEqual(2);
    });

    test('should give error if token is missing', async () => {
      let comment = await Comment.findOne({});

      expect(comment.comment).toEqual('first');
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .send({ comment: 'second' })
        .expect(401);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if token is invalid', async () => {
      let comment = await Comment.findOne({});
      expect(comment.comment).toEqual('first');
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .send({ comment: 'second' })
        .set('Authorization', `bearer afasodkasogaks`)
        .expect(401);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if user is invalid', async () => {
      let comment = await Comment.findOne({});
      let token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld25ld0Bib3VuLmVkdS50ciIsImlkIjoiNWVjN2FlZjBhNGViYjg3NmNjZDMyYmM0IiwiaWF0IjoxNTkwMzIyMzM5fQ.xipMJeaXCsWJNyvteWPjz1eqDnHSZWT-Ajn8VbB1HS4';

      expect(comment.comment).toEqual('first');
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .send({ comment: 'second' })
        .set('Authorization', `bearer ${token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if comment id is invalid', async () => {
      const commentId = '507f191e810c19729de860ea';
      let user = await helper.loginUser({
        email,
        password,
      });
      const res = await api
        .put(`${baseUrl}/${commentId}`)
        .send({ comment: 'second' })
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if user is different', async () => {
      let comment = await Comment.findOne({});
      let user = await helper.loginUser({
        email: 'onur@boun.edu.tr',
        password: '123456789',
      });
      expect(comment.comment).toEqual('first');
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .send({ comment: 'second' })
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should update comment', async () => {
      let comment = await Comment.findOne({});
      let user = await helper.loginUser({
        email,
        password,
      });
      expect(comment.comment).toEqual('first');
      const res = await api
        .put(`${baseUrl}/${comment._id}`)
        .send({ comment: 'second' })
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
      expect(res.body.comment).toEqual('second');
      comment = await Comment.findOne({});
      expect(comment.comment).toEqual('second');
    });
  });

  describe('when deleting a comment', () => {
    beforeEach(async () => {
      await Comment.deleteMany({});
      let lesson = await Lesson.findOne();
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`);
    });

    test('should give error if token is missing', async () => {
      let comment = await Comment.findOne({});
      const res = await api.delete(`${baseUrl}/${comment._id}`).expect(401);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if token is invalid', async () => {
      let comment = await Comment.findOne({});
      const res = await api
        .delete(`${baseUrl}/${comment._id}`)
        .set('Authorization', `bearer asdoakgawofkaodkas`)
        .expect(401);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if comment id is invalid', async () => {
      const commentId = '507f191e810c19729de860ea';
      let user = await helper.loginUser({
        email: 'onur@boun.edu.tr',
        password: '123456789',
      });
      const res = await api
        .delete(`${baseUrl}/${commentId}`)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if user not found', async () => {
      let comment = await Comment.findOne({});

      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld25ld0Bib3VuLmVkdS50ciIsImlkIjoiNWVjN2FlZjBhNGViYjg3NmNjZDMyYmM0IiwiaWF0IjoxNTkwMzIyMzM5fQ.xipMJeaXCsWJNyvteWPjz1eqDnHSZWT-Ajn8VbB1HS4';
      const res = await api
        .delete(`${baseUrl}/${comment._id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if different user tries to delete', async () => {
      let comment = await Comment.findOne({});
      let user = await helper.loginUser({
        email: 'onur@boun.edu.tr',
        password: '123456789',
      });

      const res = await api
        .delete(`${baseUrl}/${comment._id}`)
        .set('Authorization', `bearer ${user.token}`)
        .expect(401);
      expect(res.body.error).toBeDefined();
    });

    test('should delete comment', async () => {
      let user = await helper.loginUser({
        email,
        password,
      });
      let comment = await Comment.findOne({});
      let lesson = await Lesson.findById(comment.lesson).populate('comments');
      let teacher = await Teacher.findById(comment.teacher).populate(
        'comments'
      );
      let dbUser = await User.findOne({}).populate('comments');
      let commentsTotal = await Comment.find({}).countDocuments();
      expect(lesson.comments.length).toEqual(1);
      expect(teacher.comments.length).toEqual(1);
      expect(dbUser.comments.length).toEqual(1);
      expect(commentsTotal).toEqual(1);
      const res = await api
        .delete(`${baseUrl}/${comment._id}`)
        .set('Authorization', `bearer ${user.token}`)
        .expect(204);
      lesson = await Lesson.findById(lesson._id).populate('comments');
      teacher = await Teacher.findById(teacher._id).populate('comments');
      dbUser = await User.findOne({}).populate('comments');
      commentsTotal = await Comment.find({}).countDocuments();
      expect(lesson.comments.length).toEqual(0);
      expect(teacher.comments.length).toEqual(0);
      expect(dbUser.comments.length).toEqual(0);
      expect(commentsTotal).toEqual(0);
    });
  });

  describe('when posting new comment', () => {
    beforeEach(async () => {
      await Comment.deleteMany({});
    });

    test('should not post a comment that has over 4000 letter', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const longComment = 'a'.repeat(4001);
      expect(longComment.length).toEqual(4001);
      const comment = {
        comment: longComment,
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should post comment that has 4000 letter', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const longComment = 'a'.repeat(4000);
      expect(longComment.length).toEqual(4000);
      const comment = {
        comment: longComment,
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(201);
      expect(res.body.error).not.toBeDefined();
    });

    test('should post comment', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(201);
      const b = res.body;
      expect(b.user).toBeDefined();
      expect(b.comment).toEqual(comment.comment);
      expect(b.teacher).toEqual(teacher._id.toString());
      expect(b.lesson).toEqual(lesson._id.toString());
      expect(b.likes.length).toEqual(1);
      lesson = await Lesson.findById(lesson._id).populate('comments');
      expect(lesson.comments.length).toEqual(1);
      teacher = await Teacher.findById(teacher._id).populate('comments');
      expect(teacher.comments.length).toEqual(1);
      user = await User.findOne({}).populate('comments');
      expect(user.comments.length).toEqual(1);
      const commentsTotal = await Comment.find({}).countDocuments();
      expect(commentsTotal).toEqual(1);
    });
  });

  describe('when posting comment if information is invalid', () => {
    test('should give error if teacherId does not match with lesson.teacher', async () => {
      let lesson = await Lesson.findOne({ areaCode: 'FLED' });
      let teacher = await Teacher.findOne({ name: 'BARIS TARIH' });
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('should give error if lessonId is invalid', async () => {
      let teacher = await Teacher.findOne({});
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: '507f1f77bcf86cd799439011',
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if teacherId is invalid', async () => {
      let lesson = await Lesson.findOne({});
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: '507f1f77bcf86cd799439011',
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if user is invalid', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);

      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set(
          'Authorization',
          `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld25ld0Bib3VuLmVkdS50ciIsImlkIjoiNWVjN2FlZjBhNGViYjg3NmNjZDMyYmM0IiwiaWF0IjoxNTkwMzIyMzM5fQ.xipMJeaXCsWJNyvteWPjz1eqDnHSZWT-Ajn8VbB1HS4`
        )
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('when posting comment if information missing', () => {
    test('should give error if comment is missing', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if teacherId is missing', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if lessonId is missing', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer ${user.token}`)
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if token is missing', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        comment: 'first',
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api.post(`${baseUrl}`).send(comment).expect(401);
      expect(res.body.error).toBeDefined();
    });
    test('should give error if token is invalid', async () => {
      let lesson = await Lesson.findOne({});
      let teacher = await Teacher.findById(lesson.teacher);
      let user = await helper.loginUser({
        email,
        password,
      });
      const comment = {
        lessonId: lesson._id,
        teacherId: teacher._id,
      };
      const res = await api
        .post(`${baseUrl}`)
        .send(comment)
        .set('Authorization', `bearer asdawokagoksdofks`)
        .expect(401);
      expect(res.body.error).toBeDefined();
    });
  });
});
