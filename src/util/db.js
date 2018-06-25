let prefix = "djtu.dev."
if (process.env.NODE_ENV == "production") {
  prefix = "djtu.production."
}

const Set = (key, value) => {
  wx.setStorageSync(prefix + key, value)
}

const Get = (key) => {
  return wx.getStorageSync(prefix + key)
}

const Clean = (key) => {
  return wx.removeStorage(prefix + key)
}

module.exports = {
  Set,
  Get,
  Clean
}
