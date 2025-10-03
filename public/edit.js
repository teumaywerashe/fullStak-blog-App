  const editBtnDOM = document.getElementById('finish-edit-btn')
  const backBtnDOM = document.getElementById('back-to-main')

  const headerDOM = document.getElementById('post-header')
  const textDOM = document.getElementById('post-text')

  const params = window.location.search;
  const id = new URLSearchParams(params).get('id');

  const getPost = async() => {
      try {
          const token = localStorage.getItem('token')
          const response = await axios.get(`/api/v1/posts/${id}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          const post = response.data;
          headerDOM.value = post.postHeader
          textDOM.value = post.postText
      } catch (error) {
          console.log(error);
      }

  }
  getPost()
  editBtnDOM.addEventListener('click', async() => {
      const header = headerDOM.value
      const text = textDOM.value
      const token = localStorage.getItem('token')
      try {
          axios.patch(`/api/v1/posts/${id}`, {
              postHeader: header,
              postText: text
          }, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          alert('editing succed')
      } catch (error) {

      }
  })

  backBtnDOM.addEventListener('click', () => {
      window.location.href = 'posts.html'
  })