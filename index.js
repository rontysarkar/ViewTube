const btnContainer = document.getElementById('btn-container');
const videoCardContainer = document.getElementById('video-card-container');
const erroElement = document.getElementById("erro-element")


let selectedCategory = 1000;
let sortBtns = false;

function sortBtn(){
  sortBtns = true;
  videoCardInfo(selectedCategory,sortBtns)
}

const fetchCategoris = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({data}) => {
         data.forEach(btn => {
             const newBtn = document.createElement('button');
             newBtn.classList = `btn-category btn px-6 border-none`
             newBtn.innerText = btn.category;
             newBtn.classList.remove("bg-red-600")
             btnContainer.appendChild(newBtn)
             
  
            //  console.log(data)

             newBtn.addEventListener('click', () => {
              let btnCategory = document.querySelectorAll(".btn-category")
              btnCategory.forEach((btns) =>{
                btns.classList.remove('bg-red-600')
              })
              newBtn.classList.add('bg-red-600')
              
              
              videoCardInfo(btn.category_id)})
         });

        })
        
}

const videoCardInfo = (category_id ,sortBtns) =>{
    selectedCategory = category_id;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
        .then((res) =>res.json())
        .then(({data}) => {
          if(sortBtns){
            data.sort((a,b) =>{
              const fastView = a.others?.views;
              const secoundView = b.others?.views;
              const fastViewNumber = parseFloat(fastView.replace("K",'')) || 0;
              const secoundViewNumber = parseFloat(secoundView.replace("K","")) || 0;
              return secoundViewNumber - fastViewNumber;
    
            })
          }
            
            if(data.length === 0){
              erroElement.classList.remove('hidden')
            }else{
              erroElement.classList.add('hidden')
            }
            videoCardContainer.innerHTML = "";
            data.forEach((cardInfo) => {
    
                // console.log(cardInfo.authors[0].verified)
                let verifiedBadge = ''
                if(cardInfo.authors[0].verified){
                  verifiedBadge = `<img class="size-6" src="image/blue.png" alt="">`
                }
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="card card-compact w-[350px] h-[300px] bg-base-100 shadow-xl">
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
                      ${verifiedBadge}
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
