import React from "react";
import styles from "./footer.module.css";

function Footer() {
return(
    <div styles={{position: "fixed", bottom: "0px"}}>         
        <div className="row d-flex justify-content-center align-items-center rows">
            <div className="col-md-6" style={{flex: "0 0 auto",width: "100%"}}>
                <div className={styles.card}>
                    <div className="text-center" style={{textAlign: "center" }}> <img src="https://i.imgur.com/Dh7U4bp.png" width="200"></img> <span className="d-block mt-3" style={{display: "block",marginTop: "1rem"}}>Subscribe to our newsletter in order not to miss new arrivals <br/> promotions and discounts of our store</span>
                        <div className={styles.mx_5}>
                            <div className={styles.input_group}>  <input type="text" className={styles.form_control} placeholder="Enter email" aria-label="Recipient's username" aria-describedby="button-addon2" style={{width: "20rem",}}/>  <button className={styles.btn} type="button" id="button-addon2" style={{color: "#fff",backgroundColor: "#0ea0ff",borderColor: "#0ea0ff",}}>Subscribe</button> 
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className={styles.body}>
                <footer className={styles.footer} style={{flex: "1 100%"}}>
                    <div className={styles.footer__addr}>
                        <h1 className="footer__logo">Prospaces</h1>

                        <h2 style={{marginTop: "1.3em",fontSize: "15px",fontWeight: "400",}}>Contact</h2>

                        <address style={{fontStyle: "normal",color: "#999",}}>
                        5534 Somewhere In. The World 22193-10212
                        </address>
                        <a className="footer__btn" href="mailto:example@gmail.com" style={{fontStyle: "normal",color: "#0ea0ff",}}>Email Us</a>
                    </div>

                    <ul className={styles.footer__nav}>
                        <li className="nav__item"  style={{lineHeight: "2em"}}>
                            <h2 className={styles.nav__title}>Media</h2>

                            <ul className="nav__ul">
                                <li>
                                    <a href="#" style={{color: "#999"}}>Online</a>
                                </li>

                                <li>
                                    <a href="#" style={{color: "#999"}}>Print</a>
                                </li>

                                <li>
                                    <a href="#" style={{color: "#999"}}>Alternative Ads</a>
                                </li>
                            </ul>
                        </li>
                        
                        <li className="nav__item"  style={{lineHeight: "2em"}}>
                            <h2 className={styles.nav__title}>Media</h2>

                            <ul className="nav__ul">
                                <li>
                                    <a href="#" style={{color: "#999"}}>Online</a>
                                </li>

                                <li>
                                    <a href="#" style={{color: "#999"}}>Print</a>
                                </li>

                                <li>
                                    <a href="#" style={{color: "#999"}}>Alternative Ads</a>
                                </li>
                            </ul>
                        </li>

                        <li className={styles.nav__item__extra} style={{lineHeight: "2em",flexGrow: "2",}}>
                            <h2 className={styles.nav__title}>Technology</h2>

                            <ul className={styles.nav__ul__extra}>
                                {/* <li>
                                    <a href="#" style={{color: "#999"}}>Hardware Design</a>
                                </li>

                                <li>
                                    <a href="#"style={{color: "#999"}}>Software Design</a>
                                </li>

                                <li>
                                    <a href="#"style={{color: "#999"}}>Digital Signage</a>
                                </li> */}

                                <li>
                                    <a href="#"style={{color: "#999"}}>Automation</a>
                                </li>

                                <li>
                                    <a href="#"style={{color: "#999"}}>Artificial Intelligence</a>
                                </li>

                                <li>
                                    <a href="#"style={{color: "#999"}}>IoT</a>
                                </li>
                            </ul>
                        </li>


                        <li className="nav__item" style={{lineHeight: "2em"}}>  
                            <h2 className={styles.nav__title}>Legal</h2>

                            <ul className="nav__ul">
                                <li>
                                    <a href="#"style={{color: "#999"}}>Privacy Policy</a>
                                </li>

                                <li>
                                    <a href="#"style={{color: "#999"}}>Terms of Use</a>
                                </li>

                                <li>
                                    <a href="#"style={{color: "#999"}}>Sitemap</a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className={styles.legal}>
                        <p>&copy; 2019 Something. All rights reserved.</p>
                    </div>
                </footer>
            </div>    
    </div>
    )
}

export default Footer;
