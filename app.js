// load all post in the middle section

const loadAllPost = async (post) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${post}`);

    const data = await response.json();
    //  console.log(data.posts);

    const postContainer = document.getElementById('post-container')

    data.posts.forEach((post) => {
        // console.log(post.image);

        const div = document.createElement('div')
        div.innerHTML = `
           <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-400 bg-opacity-15 border border-green-600 rounded-lg shadow-lg p-4">
  <!-- img -->
  <div class="flex-shrink-0 m-2 w-24 h-24 sm:w-32 sm:h-32 border border-red-300 rounded-xl flex justify-center items-center">
    <img src="${post.image}" alt="" class="w-full h-full object-cover rounded-xl">
  </div>
  <!-- text and other -->
  <div class="flex flex-col justify-between py-2 space-y-2 flex-1">
    <div class="flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-4">
      <p class="text-sm sm:text-base">#${post.category}</p>
      <p class="text-sm sm:text-base">Author: ${post.author.name}</p>
    </div>
    <p class="text-lg sm:text-xl font-semibold">${post.title}</p>
    <p class="text-sm sm:text-base">${post.description}</p>
    <!-- statistics -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div class="flex space-x-6">
        <div class="flex items-center space-x-1">
          <img src="images/tabler-icon-message-2.png" alt="" class="w-4 h-4 sm:w-5 sm:h-5">
          <div class="text-sm sm:text-base">${post.comment_count}</div>
        </div>
        <!-- ----- -->
        <div class="flex items-center space-x-1">
          <img src="images/Group 16.png" alt="" class="w-4 h-4 sm:w-5 sm:h-5">
          <div class="text-sm sm:text-base">${post.view_count}</div>
        </div>
        <!-- ----- -->
        <div class="flex items-center space-x-1">
          <img src="images/Group 18.png" alt="" class="w-4 h-4 sm:w-5 sm:h-5">
          <div class="text-sm sm:text-base">${post.posted_time}</div>
        </div>
        <!-- ----- -->
      </div>
      <div class="mt-2 sm:mt-0 border border-red-300 rounded-xl">
        <button class="btn btn-ghost p-2" onclick="handleBtn('${post.title}', '${post.view_count}')">
          <img src="images/Group 40106.png" alt="" class="w-6 h-6 sm:w-8 sm:h-8">
        </button>
      </div>
    </div>
  </div>
</div>


        `

        postContainer.appendChild(div);

    })
}
loadAllPost('posts')

// latest post in the last section 

const latestsPost = async (post) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-${post}`);

    const data = await response.json();
    console.log(data);

    const latestspost = document.getElementById('latest-post')
    data.forEach((item) => {
        console.log(item); div = document.createElement('div');
        div.innerHTML = ` 
            <!-- -----------------------1st-------------------------------- -->
<div class="card bg-base-100 w-full max-w-md shadow-xl pb-4 mx-4 sm:mx-8 lg:mx-auto lg:max-w-2xl">
  <figure>
    <img src="${item.cover_image}" alt="Cover Image" class="w-full h-auto rounded-t-lg">
  </figure>
  <!-- -------------------------------- -->
  <div class="flex items-center space-x-2 p-2">
    <img src="images/time and data.png" alt="Date Icon" class="w-5 h-5">
    <p class="text-sm opacity-85">${item.author.posted_date ? item.author.posted_date : 'Not yet published'}</p>
  </div>
  <div class="px-4 mt-3">
    <p class="text-lg font-medium">${item.title}</p>
    <p class="text-base mt-1">${item.description}</p>
  </div>
  <div class="flex items-center space-x-2 mt-3 px-4">
    <div class="w-12 h-12 border border-red-300 rounded-full overflow-hidden">
      <img src="${item.profile_image}" alt="Profile Image" class="w-full h-full object-cover">
    </div>
    <div class="text-base font-medium">Cameron Williamson</div>
  </div>
</div>
<!-- ------------------------------------------------------- -->


        `
        latestspost.appendChild(div);
    })
}
latestsPost("posts")

// handleBtn()

const handleBtn = (heading, count) => {
    console.log(heading, count);
    const clickedItem = document.getElementById('clicked-item');

    const div = document.createElement('div')
    div.innerHTML = `
        <div  class="flex justify-between bg-white border rounded-xl">
                
        <div class="p-2">${heading}</div>
      <div class="flex space-x-1 p-2">
        <div><img src="images/Group 16.png" alt=""></div>
        <div>${count}</div>
      </div>
               </div>
          
    `;
    clickedItem.appendChild(div)
   
  }
//   handleSubmit()

async function handleSubmit(category) {
    try {
        const inputField = document.getElementById('get-value');
        const getValue = inputField.value.trim(); 
        console.log(getValue);

        const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${getValue}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }        
        const data = await response.json();
        console.log(data.posts);

        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = ''; 

        data.posts.forEach((post) => {
            const div = document.createElement('div');
            div.classList.add('flex', 'space-x-5', 'bg-gray-400', 'bg-opacity-15', 'border', 'border-green-600', 'rounded-lg', 'shadow-lg', 'p-4', 'mb-4');

            div.innerHTML = `
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-400 bg-opacity-15 border border-green-600 rounded-lg shadow-lg p-4">
  <!-- img -->
  <div class="flex-shrink-0 m-2 w-24 h-24 sm:w-32 sm:h-32 border border-red-300 rounded-xl flex justify-center items-center">
    <img src="${post.image}" alt="" class="w-full h-full object-cover rounded-xl">
  </div>
  <!-- text and other -->
  <div class="flex flex-col justify-between py-2 space-y-2 flex-1">
    <div class="flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-4">
      <p class="text-sm sm:text-base">#${post.category}</p>
      <p class="text-sm sm:text-base">Author: ${post.author.name}</p>
    </div>
    <p class="text-lg sm:text-xl font-semibold">${post.title}</p>
    <p class="text-sm sm:text-base">${post.description}</p>
    <!-- statistics -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div class="flex space-x-6">
        <div class="flex items-center space-x-1">
          <img src="images/tabler-icon-message-2.png" alt="" class="w-4 h-4 sm:w-5 sm:h-5">
          <div class="text-sm sm:text-base">${post.comment_count}</div>
        </div>
        <!-- ----- -->
        <div class="flex items-center space-x-1">
          <img src="images/Group 16.png" alt="" class="w-4 h-4 sm:w-5 sm:h-5">
          <div class="text-sm sm:text-base">${post.view_count}</div>
        </div>
        <!-- ----- -->
        <div class="flex items-center space-x-1">
          <img src="images/Group 18.png" alt="" class="w-4 h-4 sm:w-5 sm:h-5">
          <div class="text-sm sm:text-base">${post.posted_time}</div>
        </div>
        <!-- ----- -->
      </div>
      <div class="mt-2 sm:mt-0 border border-red-300 rounded-xl">
        <button class="btn btn-ghost p-2" onclick="handleBtn('${post.title}', '${post.view_count}')">
          <img src="images/Group 40106.png" alt="" class="w-6 h-6 sm:w-8 sm:h-8">
        </button>
      </div>
    </div>
  </div>
</div>

            `;

            postContainer.appendChild(div);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
}
