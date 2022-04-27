import React from "react";
import styles from "./aboutus.module.css";
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/homepage/Footer"
function Aboutus() {
return(
      <>
      <Navbar/>
      <hr className={styles.hr} />
    <div className={styles.bg_light}>
        <div className={styles.container} style={{paddingTop: "3rem",paddingBottom: "3rem"}}>
            <div className={styles.row} style={{paddingTop: "3rem",paddingBottom: "3rem",height: "100%",display: "inline-block"}}>
                <div className={styles.col_lg_6} style={{textAlign: "center"}}>
                    <h1 className={styles.display_4}>About us page</h1>
                </div>
                <div className={styles.col_lg_6} >
                {/* eslint-disable-next-line*/}
                    <img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" className="img-fluid" style={{maxWidth: "100%",height: "auto",marginLeft:"450px"}}/>
                </div>
            </div>
        </div>
    </div>

    <div className={styles.bg_white} style={{paddingTop: "3rem",paddingBottom: "3rem"}}>
        <div className={styles.container} style={{paddingTop: "3rem",paddingBottom: "3rem"}}>
            <div className={styles.row} style={{marginBottom: "3rem"}}>
                <div className={styles.col_lg_6} style={{order: "1",order: "2"}}><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                    <h2 className="font-weight-light" style={{fontWeight:"lighter"}}>Intention behind project</h2>
                    <p className={styles.text_muted} style={{marginBottom: "1.5rem",fontStyle: "italic"}}>We created the project to help people who need more manpower for their projects,teams and etc.</p><a href="#" className={styles.btn} style={{paddingRight: "3rem" ,paddingLeft: "3rem",borderRadius: "50rem"}}>Read more</a>
                </div>
                <div className={styles.col_lg_5}  style={{paddingRight: "3rem" ,paddingLeft: "3rem",order: "1",order: "2",marginLeft:"200px"}}>
                    {/* eslint-disable-next-line*/}
                    <img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" className="img-fluid" style={{marginBottom: "0",maxWidth: "100%",height: "auto"}}/>
                </div>
            </div>
        </div>
    </div>
    
    <div className={styles.bg_light} style={{paddingTop: "3rem",paddingBottom: "3rem"}}>
        <div className={styles.container} style={{paddingTop: "3rem",paddingBottom: "3rem"}}>
            <div className={styles.row} style={{marginBottom: "1.5rem"}}>
                <div className={styles.col_lg_5}>
                    <h2 className={styles.display_4} style={{fontWeight:"lighter"}}>Our team</h2>
                    <p className={styles.text_muted} style={{marginBottom: "1.5rem",fontStyle: "italic"}}>This is the core team at proSpaces.</p>
                </div>
            </div>

            <div className={styles.row} style={{textAlign: "center", display: "flex",justifyContent: "space-around"}}>
                <div className={styles.col_xl_3} style={{marginBottom: "3rem"}}>
                    <div className={styles.devlop} style={{paddingTop: "3rem",paddingBottom: "3rem", borderRadius: ".25rem"}}>
                        {/* eslint-disable-next-line*/}
                        <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png" alt="" width="100" className={styles.img_thumbnail} />
                       
                        <h5 className="mb-0" style={{marginBottom: "0"}}>Dhiraj Kumar Chintada</h5><span className={styles.text_muted} style={{fontSize: "0.875em",textTransform: "uppercase"}}>Co-Founder</span>
                    </div>
                </div>


                <div className={styles.col_xl_3} style={{marginBottom: "3rem"}}>
                    <div className={styles.devlop} style={{paddingTop: "3rem",paddingBottom: "3rem",borderRadius: ".25rem"}}>
                        {/* eslint-disable-next-line*/}
                        <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" className={styles.img_thumbnail} />
                       
                        <h5 className="mb-0" style={{marginBottom: "0"}}>Bhima Shankar Deverakonda</h5><span className={styles.text_muted} style={{fontSize: "0.875em",textTransform: "uppercase"}}>Co-Founder</span>
                    </div>
                </div>



                <div className={styles.col_xl_3} style={{marginBottom: "3rem"}}>
                    <div className={styles.devlop} style={{paddingTop: "3rem",paddingBottom: "3rem",borderRadius: ".25rem"}}>
                        {/* eslint-disable-next-line*/}
                        <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" className={styles.img_thumbnail} />
                        
                        <h5 className="mb-0" style={{marginBottom: "0"}}>Sri Ritwik Cherukuri</h5><span className={styles.text_muted} style={{fontSize: "0.875em",textTransform: "uppercase"}}>Co-Founder</span>
                    </div>
                </div>



                <div className={styles.col_xl_3} style={{marginBottom: "3rem"}}>
                    <div className={styles.devlop} style={{paddingTop: "3rem",paddingBottom: "3rem",borderRadius: ".25rem"}}>
                        {/* eslint-disable-next-line*/}
                        <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png" alt="" width="100" className={styles.img_thumbnail} />
                        
                        <h5 className="mb-0" style={{marginBottom: "0"}}>Madhukar Doppalapudi</h5><span className={styles.text_muted} style={{fontSize: "0.875em",textTransform: "uppercase"}}>Co-Founder</span>
                    </div>
                </div>

                <div className={styles.col_xl_3} style={{marginBottom: "3rem"}}>
                    <div className={styles.devlop} style={{paddingTop: "3rem",paddingBottom: "3rem",borderRadius: ".25rem"}}>
                         {/* eslint-disable-next-line*/}
                        <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" className={styles.img_thumbnail} />
                       
                        <h5 className="mb-0" style={{marginBottom: "0"}}>Yuvaraj Banavath</h5><span className={styles.text_muted} style={{fontSize: "0.875em",textTransform: "uppercase"}}>Member</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Footer/>
    </>
    )
}

export default Aboutus;
