const addPost = document.getElementById("add-new-post");
const postDOM = document.getElementById("post-container");
const deleteButtonArea = document.getElementById("post-container");
const usernameDOM = document.getElementById("user-name");
const profilePictureDOM = document.getElementById("profile-photo");
const logoutBtn = document.getElementById("logout-btn");

const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

usernameDOM.textContent = username;
profilePictureDOM.alt = username.charAt(0).toUpperCase();

addPost.addEventListener("click", () => {
    window.location.href = "new-post.html";
});

const displayPost = async() => {
    const response = await axios.get("/api/v1/posts", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const posts = response.data;
    if (posts.length < 1) {
        postDOM.innerHTML = "no blogs posted";
        return;
    }
    const allPost = posts
        .map((post) => {
            const isoDate = post.createdAt;
            const date = new Date(isoDate);

            const formatted = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            console.log(formatted);
            return `
            <div class="post">
             
                <div>
                    <h2 id="header">${post.postHeader}</h2>
                        <div class="post-meta">by ${
                          post.username
                        } | ${formatted}</div>

                    <div class="content">
                        <p>${post.postText}</p>
                    </div>
                </div>
                <div style="display: ${
                  post.username === username ? "flex" : "none"
                }"  id="action" class="actions">
                    
                   <a ><button class="delete" data-id="${post._id}">Delete</button></a>
                   <a href="edit.html?id=${
                     post._id
                   }"> <button class="edit" data-id="${
        post._id
      }">Edit</button></a>
                </div>
            </div>
            `;
        })
        .join("");
    postDOM.innerHTML = allPost;
    console.log(posts);
};

displayPost();
deleteButtonArea.addEventListener("click", async(e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.dataset.id;
        try {
            await axios.delete(`/api/v1/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            displayPost();
        } catch (error) {}
    }
});
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "index.html";
});