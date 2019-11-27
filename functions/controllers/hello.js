exports.helloworld = (req, res, next) => {
  console.log('I am helloooo Worrlld');
  
  res.json({ message: 'Hello World' });
  next();
};
