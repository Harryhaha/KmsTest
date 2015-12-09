/**
 * Created by DELL on 2015/12/8.
 */
//var kms = new MongoInternals.RemoteCollectionDriver("mongodb://kms:kms@dev02.pek.cclaw.net:27017/kms");
//Pages = new Mongo.Collection('pages', { _driver: kms });

Pages = new Mongo.Collection('pages');
Segments = new Mongo.Collection('segments');
Paragraphs = new Mongo.Collection('paragraphs');