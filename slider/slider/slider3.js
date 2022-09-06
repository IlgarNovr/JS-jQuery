$(()=>{
    let path= 'img/'
    let image = ['avatar.jpg','baloon.webp','hacker.jpg','fudzi.jpg','qiji.webp','qiz.jpeg','maral.jpg','sauron.jpg']
    let x = 0
    let timer = setTimeout(change, 1, 0)


    $("#slider")
        .css({
            position: 'relative',
            overflow: 'hidden'
        })
        .append('<p ></p>')
        .append('<div id="slide"></div>')
        .append('<div id="thumbs"></div>')
        .append('<div id="progbar"></div>')
        .click(function(e){
            change( e.clientX > $(window).width() / 2 ? 1 : -1)
        })

    const slide = $("#slide")
    const progbar = $("#progbar")
    const thumbs = $("#thumbs")
    
    
    $("#slider>p").css({
        position: "absolute",
        zIndex: "99",
        left: "97%",
        color: "#fff", 
        fontSize: ".9em"
    })


    slide.css({
            position: 'absolute',
            width: image.length * 100 + '%',
            height: '100%',
            display: 'flex'
    })
    image.forEach(item => slide.append(`<img src="${path}${item}" />`)) 

    slide.children().css({
            width: $("#slider").width(),
            height: "100%",
            objectFit: 'cover'
    })

    
    progbar.css({
            background: '#fff',
            width: "0",
            height: '3px',
            position: 'absolute',
            opacity: .7,
            top: "99%"
    })


    thumbs.css({
            position: 'absolute',
            width: '100%',
            bottom: 0,
            textAlign: 'center'
    })
    image.forEach(item => thumbs.append(`<img src="${path}${item}" />`)) 
 
    thumbs.children()
        .css({
            width: "32px",
            height: "32px",
            borderRadius: '50%',
            border: '2px solid #fff',
            margin: '5px',
            cursor: 'pointer',
            zIndex: '99'
    })
        .click(function(e){
            e.stopPropagation()
            x = $(this).index()
            change(0)
    })


    function change(dir = 1) {
        clearTimeout(timer)
        x += dir

        if(x >= image.length) x = 0
        if(x < 0) x = image.length - 1
        
        $("#slider>p").text(`${x + 1}/${image.length}`)
        
        show()
        timer = setTimeout(change, 3000)
    }

    function show() {
        progbar.stop()
        progbar.css({width: 0})
        progbar.animate({width: "100%"}, 3000)

        slide.animate({ left: -100 * x + '%' }, 300)

        thumbs.children().css({opacity: .5, height: "32px", width: "32px"})
        thumbs.children().eq(x).css({opacity: 1, height: "38px", width: "38px"})
    }

    $(window).resize(() => {
        slide.children().css({ width: $("#slider").width()})
    })

})