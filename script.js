//Testing tensorflow.js functionality.
console.log("Hello Tensorflow.")//printing to console

const a=tf.tensor([[1,2],[3,4]])

const b=a.reshape([4,1])

a.array().then(array=>alert(array))

a.data().then(data=>alert(data))

