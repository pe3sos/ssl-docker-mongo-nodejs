const mongoose = require('mongoose');
(async () => {
  try {
    const keyFile = __dirname + "/certs/client.pem";
    const certFile = __dirname + "/certs/ca.pem";
    const mongohost = process.env.MONGOHOST || "localhost"
    const db = await mongoose.connect(`mongodb://${mongohost}:27017/test`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      tls: true,
      authMechanism: 'MONGODB-X509',
      tlsCertificateKeyFile: keyFile,
      tlsCAFile: certFile,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    }).then((conn) => {
      console.log("Connected to mongo")
      return conn;
    }).catch((err) => {
      console.log('err', err)
    });

    var toySchema = new mongoose.Schema({
      color: String,
      name: {type: String, required: true},
      name2: {type: String, required: true}
    });

    var Toy = db.model('Toys', toySchema);

    const newtoy = {color: 'Red', name: "Little poney", name2: "Little poney"};
    await findById(Toy, {name: newtoy.name}, newtoy, {
      upsert: true,
      new: true
    }).then(r => console.log(r))
  } catch (e) {
    console.log('err', e)
  }
})();

function findById (model, filters, obj, opts) {
  const modelObj = new model(obj)
  var error = modelObj.validateSync();
  if (error) {
    throw error
  }
  return model.findOneAndUpdate(filters, obj, opts)
}