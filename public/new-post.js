 const postHeader = document.getElementById('post-header');
 const postText = document.getElementById('post-text');
 const newPostBtn = document.getElementById('new-post');

 newPostBtn.addEventListener('click', async() => {
     // Get values from textareas
     const header = postHeader.value.trim();
     const text = postText.value.trim();
     const token = localStorage.getItem('token')
     const name = localStorage.getItem('username')
     if (!header || !text) {
         alert('Please fill in both fields.');
         return;
     }

     try {
         // Send POST request to your backend
         const response = await axios.post('/api/v1/posts', {
             postHeader: header,
             postText: text,
             username: name
         }, {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });

         console.log('Post created:', response.data);

         // Optional: clear form after successful post
         postHeader.value = '';
         postText.value = '';
         alert('Post created successfully!');
         window.location.href = 'posts.html'
     } catch (err) {
         console.error(err);
         alert('Error creating post. Check the console.');
     }
 });