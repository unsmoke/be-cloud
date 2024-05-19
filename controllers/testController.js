
const getTest = (req, res) => {
  res.status(200).json({ message: 'Test route' });
}

module.exports = {
  getTest
}