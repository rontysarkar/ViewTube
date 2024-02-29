const btnContainer = document.getElementById('btn-container');
const videoCardContainer = document.getElementById('video-card-container');

let selectedCategory = 1000;

const fetchCategoris = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({data}) => {
         data.forEach(btn => {
             const newBtn = document.createElement('button');
             newBtn.classList = `btn px-6 border-none`
             newBtn.innerText = btn.category;
             btnContainer.appendChild(newBtn)
            //  console.log(data)

             newBtn.addEventListener('click', () => {videoCardInfo(btn.category_id)})
         });

        })
        
}

const videoCardInfo = (category_id) =>{
    selectedCategory = category_id;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
        .then((res) =>res.json())
        .then(({data}) => {
            
           
            videoCardContainer.innerHTML = "";
            data.forEach((cardInfo) => {
                console.log(cardInfo)
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="card card-compact w-[90%] bg-base-100 shadow-xl">
                <figure><img src="${cardInfo.thumbnail}" alt="Shoes" /></figure>
                <div class="flex gap-2 mt-4 px-2">
                  <div>
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                        <img src="${cardInfo.authors[0].profile_picture}" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 class="card-title ">${cardInfo.title}</h2>
                    <div class="flex gap-4 my-3">
                      <p class="text-xl">Awlad Hossain</p>
                      <img class="size-6" src="image/blue.png" alt="">
                    </div>
                    <p id="views" class="text-xl pb-5">${cardInfo.others.views} views</p>

                  </div>
                  
                </div>
              </div>
                `
                videoCardContainer.appendChild(div)
                
            })
            
            
        })
}

fetchCategoris()
videoCardInfo(selectedCategory);
