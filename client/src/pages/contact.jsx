import HomeBtn from "./componets/home-btn"

function Contact(){
    return(
        <div>
            <div><HomeBtn/></div>
            <h1>Suggestions inbox</h1>
            <p>Please leave any suggestions you would like me to hear. Improvements for the website or Story ideas.</p>
            <div>
             <form action="submit">
                <h3>Alias</h3>
                <input type="text" placeholder="enter your alias"/>
                <h3>Reasoning</h3>
                <input type="text" placeholder="Why?" />
                <h3 id="message">Message</h3>
                <textarea name="message" type = "text" placeholder="Go easy on me"></textarea>
                <button>MEOW!!</button>
            </form>   
            </div>
            
        </div>
    )
}

export default Contact 