

/* 确认的二次弹窗

  modelConfirm(this, '你真的确认吗？').then(() => {
    console.log('点击确定后')
  }).catch(() => {
    console.log('点击取消后')
  })

*/
function modelConfirm(vueObj, message = '二次确认您的操作') {
  return new Promise((resolve, reject) => {
    vueObj.$confirm(message, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    });

  })
}

/* 提示框

  let type = 'success'
  let type = 'error'
  let type = 'warning'
  let type = ''

  eleToast(this, '操作成功', type)

*/
// 参数：type：'success', 'error', 'warning', ''(空字符串)
function eleToast(vueObj, message = '操作成功', type = '') {

  if (!type) {
    vueObj.$message(message)

  } else {
    if (type === 'success') {
      vueObj.$message({
        message: message,
        type: type
      })

    } else if (type === 'error') {
      vueObj.$message.error(message)

    } else if (type === 'warning') {
      vueObj.$message({
        message: message,
        type: type
      })

    }

  }

}



export {
  modelConfirm,
  eleToast,
};
