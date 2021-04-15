const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const socialIcons = document.querySelector(".social-icons");

navToggle.addEventListener("click", function () {
  console.log(links.classList);
  links.classList.toggle("show-links");
  socialIcons.classList.toggle("show-icons");
});

// Slider(all Slides in a container)
const slider = document.querySelector(".slider")
// All trails 
const trail = document.querySelector(".trail").querySelectorAll("div")

// Transform value
let value = 0
// trail index number
let trailValue = 0
// interval (Duration)
let interval = 4000

// Function to slide forward
const slide = (condition) => {
    // CLear interval
    clearInterval(start)
    // update value and trailValue
    condition === "increase" ? initiateINC() : initiateDEC()
    // move slide
    move(value, trailValue)
    // Restart Animation
    animate()
    // start interal for slides back 
    start = setInterval(() => slide("increase"), interval);
}

// function for increase(forward, next) configuration
const initiateINC = () => {
    // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // increase transform value
    value === 80 ? value = 0 : value += 20
    // update trailValue based on value
    trailUpdate()
}

// function for decrease(backward, previous) configuration
const initiateDEC = () => {
     // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // decrease transform value
    value === 0 ? value = 80 : value -= 20
     // update trailValue based on value
    trailUpdate()
}

// function to transform slide 
const move = (S, T) => {
    // transform slider
    slider.style.transform = `translateX(-${S}%)`
    //add active class to the current trail
    trail[T].classList.add("active")
}

const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from(".bg", {x: "-100%", opacity: 0})
  .from("p", {opacity: 0}, "-=0.3")
  .from("h1", {opacity: 0, y: "30px"}, "-=0.3")
  .from("button", {opacity: 0, y: "-40px"}, "-=0.8")

// function to restart animation
const animate = () => tl.restart()

// function to update trailValue based on slide value
const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0
    } else if (value === 20) {
        trailValue = 1
    } else if (value === 40) {
        trailValue = 2
    } else if (value === 60) {
        trailValue = 3
    } else {
        trailValue = 4
    }
}   

// Start interval for slides
let start = setInterval(() => slide("increase"), interval)

// Next  and  Previous button function (SVG icon with different classes)
document.querySelectorAll("svg").forEach(cur => {
    // Assign function based on the class Name("next" and "prev")
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"))
})

// function to slide when trail is clicked
const clickCheck = (e) => {
    // CLear interval
    clearInterval(start)
    // remove active class from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // Get selected trail
    const check = e.target
    // add active class
    check.classList.add("active")

    // Update slide value based on the selected trail
    if(check.classList.contains("box1")) {
        value = 0
    } else if (check.classList.contains("box2")) {
        value = 20
    } else if (check.classList.contains("box3")) {
        value = 40
    } else if (check.classList.contains("box4")) {
        value = 60
    } else {
        value = 80
    }
    // update trail based on value
    trailUpdate()
    // transfrom slide
    move(value, trailValue)
    // start animation
    animate()
    // start interval
    start = setInterval(() => slide("increase"), interval)
}

// Add function to all trails
trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)))

// Mobile touch Slide Section
const touchSlide = (() => {
    let start, move, change, sliderWidth

    // Do this on initial touch on screen
    slider.addEventListener("touchstart", (e) => {
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth/trail.length
    })
    
    // Do this on touchDrag on screen
    slider.addEventListener("touchmove", (e) => {
        // prevent default function
        e.preventDefault()
        // get the touche position of X on the screen when dragging stops
        move = e.touches[0].clientX
        // Subtract initial position from end position and save to change variabla
        change = start - move
    })

    const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > (sliderWidth/4)  ? slide("increase") : null;
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        (change * -1) > (sliderWidth/4) ? slide("decrease") : null;
        // reset all variable to 0
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    // call mobile on touch end
    slider.addEventListener("touchend", mobile)
})()

// script for comment

comments = [
    {
        image: 'https://source.unsplash.com/1000x1000/?white',
        name: 'Slide 1',
        description: 'White Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?blue',
        name: 'Slide 2',
        description: 'Blue Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?cyan',
        name: 'Slide 3',
        description: 'Cyan Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?green',
        name: 'Slide 4',
        description: 'Green Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?yellow',
        name: 'Slide 5',
        description: 'Yellow Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?orange',
        name: 'Slide 6',
        description: 'Orange Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?red',
        name: 'Slide 7',
        description: 'Red Random Image'
    },
    {
        image: 'https://source.unsplash.com/1000x1000/?purple',
        name: 'Slide 8',
        description: 'Purple Random Image'
    },
]

// cash
const commentSlider = document.querySelector('.comment-slider')
commentSlider.innerHTML = `
<div class="images"></div>
<div class="comments">
    <div class="comment">
        <div class="name"></div>
        <div class="description"></div>
    </div>
</div>
`
const imagesWrapper = commentSlider.querySelector('.images')
const name = commentSlider.querySelector('.name')
const description = commentSlider.querySelector('.description')

// global
let slideIndex = 0
const duration = 6

// add slide to cycle
function addSlide(src, className = 'next') {
    const image = document.createElement('img')
    image.src = src

    imagesWrapper.appendChild(image)

    setTimeout(function() { image.classList.add(className) }, 0)
}

// change elements content with animation
function changeTextContent(element, text = '') {
    element.classList.add('out')
    setTimeout(function() {
        element.textContent = text
        setTimeout(function() { element.classList.remove('out') }, 100)
    }, 500)
}

// replace position classes
function MoveSlidesToNextStep() {
    let next = commentSlider.querySelector('.next')
    let current = commentSlider.querySelector('.current')
    let previous = commentSlider.querySelector('.previous')

    if(next) {
        next.classList.remove('next')
        next.classList.add('current')
    }

    if(current) {
        current.classList.remove('current')
        current.classList.add('previous')
    }

    if(previous) {
        previous.classList.remove('previous')
        previous.classList.add('out')

        setTimeout(function() {
            previous.remove()
        }, 500)
    }
}

// change text and images
function nextSlide() {
    changeTextContent(name, comments[slideIndex].name)
    changeTextContent(description, comments[slideIndex].description)

    slideIndex++
    if(slideIndex >= comments.length) slideIndex = 0

    addSlide(comments[slideIndex].image)
    MoveSlidesToNextStep()
}

setInterval(nextSlide, duration * 1000)
// initial slide
addSlide(comments[comments.length - 1].image, 'previous')
addSlide(comments[0].image, 'current')
nextSlide()

