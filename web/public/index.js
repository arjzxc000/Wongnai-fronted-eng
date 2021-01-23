const PlaceList = document.getElementById('Placelist');
const searchBar = document.getElementById('searchBar');
let trip_all = [];
//search when key strock up และทำให้ทุกค่าที่อยู่ข้อมูลเป็นตัวพิมพ์เล็กเพื่อใช้ในการหาในกรณีที่เป็นภาษาอังกฤษ
searchBar.addEventListener('keyup', (e) =>{
    const searchString = e.target.value;
    const filteredtrip = trip_all.filter(trip_all => {
        return (
            trip_all.title.toLowerCase().includes(searchString) ||
            trip_all.description.toLowerCase().includes(searchString) ||
            trip_all.tags.includes(searchString)
        );
    });
    displayPlace(filteredtrip);
});

//function to load trips from json-server
const loadPlace = async () =>{
    try {
        const res = await fetch('http://localhost:9000/trips');
        trip_all = await res.json();
        displayPlace(trip_all);
        }
    catch (err) {
        console.error(err);
    }
}

//function to display trips
const displayPlace = (trips) => {
    const htmlString = trips
        //กำลังจะมัดรวมพวก trip และจะส่งเข้าไปที่ html
        .map((trip) => {
            return `
            <div id="Placelist">
            <div>
                <h2 class="title">${trip.title}</h2>
                <p class="description">${trip.description.substring(0,310)}... <a href ="${trip.url}">อ่านต่อ</a></p>
                <p name="tags" id="tags">หมวด : ${trip.tags}</p>
            </div>
                <div class="nested">
                <a href="${trip.photos[0]}"><img src="${trip.photos[0]}"></a>
                <a href="${trip.photos[1]}"><img src="${trip.photos[1]}"></a>
                </div>
            <div>
                <div class="nested">
                <a href="${trip.photos[2]}"><img src="${trip.photos[2]}"></a>
                <a href="${trip.photos[3]}"><img src="${trip.photos[3]}"></a>
                </div>
            </div>
            </div>
            `;
            
        })
        .join('');
    PlaceList.innerHTML = htmlString;
};

loadPlace();