/**
 * 正常情况下是重置redis内的hash数据
 * 而且需要单独开一个进程，拥有独立的event loop
 * 这里重置global作为示例
 */
async function timer() {
  setTimeout(() => {
    const users = {}
    const timestamp = Date.now()
    Object.keys(global.users).forEach(key => {
      users[key] = {
        total: 0,
        start: timestamp
      }
    })
    global.users = users
    timer()
  }, 1000)
}

module.exports = timer