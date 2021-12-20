// pages/getSalesforceCode/salesforceCode.js
Page({

  /**
   * Page initial data
   */
  data: {
    code: '',
    responseData: '',
    accountList: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    console.log("options", options);
    /*获取参数*/
    const code = options.code
    that.setData({
      code: code,
    })
    console.log("code", this.data.code);
    wx.request({
      url: 'https://curious-panda-vyi56h-dev-ed.my.salesforce.com/services/oauth2/token?code='+this.data.code+'&grant_type=authorization_code&client_id=3MVG9pRzvMkjMb6ntOc.dtELNKTZaqGXCDuh7d.q1Vw2B4u4oVB8GsurODKzCeNxxi4Bm5QWp7m27krY8HKJx&client_secret=115E852A8635658B91A8B996D28F042475762744B7366A5DA0E7275278A11B9C&redirect_uri=https://curious-panda-vyi56h-dev-ed.lightning.force.com/apex/miniProgramCallBackVFPage',
      method: 'POST',
      success(res) {
        console.log(res.data);
        const salesforceOrgInfo = res.data;
        that.setData({
          responseData: JSON.stringify(salesforceOrgInfo),
        })
        wx.setStorage({
          key:"salesforceOrgInfo",
          data: salesforceOrgInfo
        });
        wx.setStorage({
          key:"salesforceOrgInfo",
          data: salesforceOrgInfo
        })
        wx.setStorage({
          key:"access_token",
          data: salesforceOrgInfo.access_token
        })
        wx.setStorage({
          key:"refresh_token",
          data: salesforceOrgInfo.refresh_token
        })

        // 获取account信息
        wx.request({
          url: 'https://curious-panda-vyi56h-dev-ed.my.salesforce.com/services/data/v52.0/sobjects/account',
          method: 'GET',
          header:{
            Authorization: salesforceOrgInfo.token_type + ' ' + salesforceOrgInfo.access_token
          },
          success(res) {
            console.log(res.data);
            that.setData({
              accountList: res.data.recentItems,
            })
            wx.hideLoading();
            // 跳转到下一个页面
          },
          fail(res) {
            wx.hideLoading();
            wx.showToast({
              title: res.data.error,
            })
          }
        })

        wx.hideLoading();
        // 跳转到下一个页面
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: res.data.error,
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * Lifecycle function--Called when page show
   */
   onShow: async function () {
    console.log("onShow");
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})