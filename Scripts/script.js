const postsContainer = document.getElementById('posts-container');


// Fetch posts from API
async function getMarketplace() {

  var myRequest = new Request('../Resource/JSON/market.json');
  const res = await fetch(myRequest);

  const data = await res.json();
  showPosts(data.data.elements);
}

async function getPostsBili() {

  const res = await fetch(
      `videos.json`
  );
  videoData = await res.json();
  return videoData;
}


async function showPosts(posts) {
 // const posts = await getPostsOld()
  posts.forEach(marketElement => {
    const post = marketElement
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    var url = post.keyImages[1].url;
    post.keyImages.forEach(KeyImage => {
      if (KeyImage.type == "Thumbnail")
      {
        url = KeyImage.url;
      }
    })
    var name = post.title.replace(/\s+/g,"-").toLowerCase()
    var stars =0;
    var nums = 0;
    if(post.hasOwnProperty("rating"))
    {
      stars = post.rating.averageRating;
      nums = post.rating.total;
    }
    postEl.innerHTML = `
      <div class="number">价格：${post.price}</div>
      <img alt="${post.title}"
      height="200px"
      title="${post.title}"
      src="${url}"/>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.description}</p>
            <p>评分：${stars}   总评分数：${nums}</p>
         <a href="https://unrealengine.com/marketplace/zh-CN/product/${name}">
           <p>点击这里跳转商城界面<p>
         </a>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

getMarketplace();
