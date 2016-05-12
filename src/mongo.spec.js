import sinon from 'sinon';
import chai from 'chai';
import mongo from './mongo';
import mongodb from 'mongodb';
let expect = chai.expect;

describe('mongo-async', () => {

  beforeEach(() => {
    sinon.stub(mongodb, 'connectAsync');
  });

  afterEach(() => {
    mongodb.connectAsync.restore();
  });

  describe('#connect', () => {
    beforeEach(() => {
      mongodb.connectAsync.returns('connected');
    });
    describe('when argument is a string', () => {
      it('should use the argument as the url', (next) => {
        mongo
          .connect('test')
          .then(() => expect(mongodb.connectAsync.args[0][0]).to.equal('test'))
          .then(() => next())
          .catch(next);
      });
      it('should use default as the instance name', async (next) => {
        mongo
          .connect('test')
          .then(() => expect(mongo._instances['default']).to.equal('connected'))
          .then(() => next())
          .catch(next);
      });
    });
    describe('when argument is an object', () => {
      it('should use the url property', (next) => {
        mongo
          .connect({ url: 'test' })
          .then(() => expect(mongodb.connectAsync.args[0][0]).to.equal('test'))
          .then(() => next())
          .catch(next);
      });
      describe('when name property supplied', () => {
        it('should use the name as the instance', (next) => {
          mongo
            .connect({ url: 'test', name: 'instance' })
            .then(() => expect(mongo._instances['instance']).to.equal('connected'))
            .then(() => next())
            .catch(next);
        });
      });
      describe('when name property not supplied', () => {
        it('should use the default instance', (next) => {
          mongo
            .connect({ url: 'test' })
            .then(() => expect(mongo._instances['default']).to.equal('connected'))
            .then(() => next())
            .catch(next);
        });
      });
    });
  });
});