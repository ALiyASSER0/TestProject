const products=[
    {
        //id:"1",
        //name:"sandal spirit",
        image: require("../assets/7.png"),
        //offPercentage:"10",
        //description:'passion and excitement are present by sandal spirit fragrance a blend',
        //price:160,
        //countInStock:3,
      //  rating:4,
        numReviews:4,
    assetss:require("../assets/4.png") ,
    },
        {
            id:"2",
            name:"royal safron",
            image: require("../assets/7.png"),
            offPercentage:"10",
            description:'passion and excitement are present by sandal spirit fragrance a blend',
            price:90,
            countInStock:10,
            rating:2,
            numReviews:2,
            assetss:require("../assets/5.png") ,
        },
        {
            id:"3",
            name:"white safron",
            image: require("../assets/7.png"),
            offPercentage:"10",
            description:'passion and excitement are present by sandal spirit fragrance a blend',
            price:200,
            countInStock:5,
            rating:3.5,
            numReviews:3,
            assetss:require("../assets/6.png") ,
        },
        {
            id:"4",
            name:"Kyara  Oil",
            image: require("../assets/7.png"),
            offPercentage:"10",
            description:'passion and excitement are present by sandal spirit fragrance a blend',
            price:780,
            countInStock:6,
            rating:5,
            numReviews:9,
                assetss:require("../assets/4.png"),
        },
        {
            id:"5",
            name:"Red Safron",
            image: require("../assets/7.png"),
            offPercentage:"10",
            // image:"https://images.pexels.com/photos/8361478/pexels-photo-8361478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description:'passion and excitement are present by sandal spirit fragrance a blend',
            price:880,
            countInStock:7,
            rating:4.5,
            numReviews:8,
            assetss:require("../assets/4.png") ,
        },
        {
            id:"6",
            name:"Red Safron",
            image: require("../assets/7.png"),
            offPercentage:"10",
            // image:"https://images.pexels.com/photos/8365693/pexels-photo-8365693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpeg",
            description:'passion and excitement are present by sandal spirit fragrance a blend',
            price:880,
            countInStock:7,
            rating:4.5,
            numReviews:8,
            assetss:require("../assets/5.png") ,
        },
{
    id:"7",
    name:"sandal spirit",
    image: require("../assets/7.png"),
    offPercentage:"10",
    description:'passion and excitement are present by sandal spirit fragrance a blend',
    price:160,
    countInStock:3,
    rating:4,
    numReviews:4,
    assetss:require("../assets/6.png") ,    
},
    {
        id:"8",
        name:"royal safron",
        image: require("../assets/7.png"),
        offPercentage:"10",
        description:'passion and excitement are present by sandal spirit fragrance a blend',
        price:90,
        countInStock:10,
        rating:2,
        numReviews:2,
            assetss:require("../assets/4.png"),
    },
    {
        id:"9",
        name:"white safron",
        image: require("../assets/7.png"),
        offPercentage:"10",
        description:'passion and excitement are present by sandal spirit fragrance a blend',
        price:200,
        countInStock:5,
        rating:3.5,
        numReviews:3,
        assetss:require("../assets/4.png") ,
    },
    {
        id:"10",
        name:"Kyara  Oil",
        image: require("../assets/7.png"),
        offPercentage:"10",
        description:'passion and excitement are present by sandal spirit fragrance a blend',
        price:780,
        countInStock:6,
        rating:5,
        numReviews:9,
        assetss:require("../assets/5.png") ,
    },
    {
        id:"11",
        name:"Red Safron",
        image: require("../assets/7.png"),
        offPercentage:"10",
        // image:"https://images.pexels.com/photos/8361478/pexels-photo-8361478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:'passion and excitement are present by sandal spirit fragrance a blend',
        price:880,
        countInStock:7,
        rating:4.5,
        numReviews:8,
        assetss:require("../assets/6.png") ,
    },
    {
        id:"12",
        name:"Red Safron",
        image: require("../assets/7.png"),
        offPercentage:"10",
        // image:"https://images.pexels.com/photos/8365693/pexels-photo-8365693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpeg",
        description:'passion and excitement are present by sandal spirit fragrance a blend',
        price:880,
        countInStock:7,
        rating:4.5,
        numReviews:8,
            assetss:require("../assets/4.png"),
    },
    
]

export function getProducts(){
    return products;
}

export function getProduct(id){
    return products.find((product) => product.id == id);
}