const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => categoryMenu(data.data));
};

const categorySection = document.getElementById('category-section');
const videoCart = document.getElementById('video-cart');

const clearVideoCards = () => {
    videoCart.innerHTML = '';
};

const categoryMenu = (data) => {
    data.forEach((menu) =>{
        // console.log(menu);
        const newMenu = document.createElement("div");
        newMenu.innerHTML = `
            <button onclick="loadData('${menu.category_id}')" class="btn btn-danger mx-2">${menu.category}</button>
        `;
        
        categorySection.appendChild(newMenu);
    });
};

loadCategory();



const loadData = (id) => {
    // console.log(id);
    clearVideoCards();
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
    
};

const displayData = (data) => {
    console.log (data);
    if (data.length === 0){
        const singleImage = document.createElement("div");
        singleImage.className = "col";
        singleImage.innerHTML = `
            <div>
            <div><img src="./image/Icon.png"  alt="Single Image"></div>
            <div class="ms-4"><h1>Oops!! Sorry, There is no content here</h1> </div>
            </div>
        `;
        videoCart.appendChild(singleImage);
    } else {
        data.forEach((video) => {
            const newVideo = document.createElement("div");
            newVideo.className = "col";
            newVideo.innerHTML = `
                <div class="card">
                    <img src=${video?.thumbnail} class="card-img-top" style="height: 200px"; alt="...">
                    <div class="d-flex mt-3">
                        <div class="ms-2">
                            <img src=${video.authors[0].profile_picture} class="card-img-top rounded-circle" style="height: 40px; width:40px"; alt="...">
                        </div>
                        <div class="ms-3">
                            <h5 class="text-start">${video.title}</h5>
                            <p>${video.authors[0].profile_name}</p>
                            <p style="margin-top: -12px">${video.others.views} views</p>
                        </div>
                    </div>
                </div>
            `;
            videoCart.appendChild(newVideo);
        });
    }
};


loadData(1000);