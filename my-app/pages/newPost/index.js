
// const Post = styled.div``;

import { auth, db } from "../../firebase";
import chat from '../../public/chat.svg';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styles from "./index.module.css";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useState, useEffect } from "react";
import { doc, serverTimestamp, setDoc, query, where, collection, getDocs, getDoc, orderBy, docs } from "firebase/firestore";
import TimeAgo from "timeago-react";
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import {useRouter} from "next/router";
import {signOut} from 'firebase/auth'


function Posts() {


    // the useAuthState hook is used for maintaining the user status, whether he is logged in or not.
    // it also returns a loading state which tells us that whether the user is logged in or not
    // (i.e) as this hook returns a promise, the loading is set to true if there is no user status,
    // and false once we get the user is logged in
    // Note: that this hook is also decalred and used in other files, 
    //so the above expalnation holds true for those files too.
  const [user,loading] = useAuthState(auth);

    // this hook is used to populate option based on the user selection in the filter section
  const [option,setOption] = useState(0);

    //This [id].js is a dynamic page and the id gets populated when a id is passed as a
    // prop to the page. We can get the id value from the useRouter hook defined in Nextjs docs.
    // this is the useRouter hook 
  const router = useRouter();


  // the postRef is a reference to the posts collection in the firebase
  // the reference to the collection changes based on the filter selection.
  const postRef = ()=>{
    if(option === 0){
      // this is when no filter is selected
      return collection(db, "posts");
    }
    else if(option === 1){
      // this is when the latest filter is selected
      return query(collection(db, "posts"), orderBy("timestamp", "desc"));
    }
    else if(option === 2){
       // this is when the teamsize(ascending) filter is selected
      return query(collection(db, "posts"), orderBy("membercount", "asc"));
    }
    else if(option === 3){
      // this is when the teamsize(descending) filter is selected
      return query(collection(db, "posts"), orderBy("membercount", "desc"));
    }
    else if(option === 4){
      // this is when the duration(ascending) filter is selected
      return query(collection(db, "posts"), orderBy("duration", "asc"));
    }
    else if(option === 5){
      // this is when the duration(descending) filter is selected
      return query(collection(db, "posts"), orderBy("duration", "desc"));
    }
    else if(option === 6){
       // this is when the my posts button is clicked
      return query(collection(db, "posts"), where("userid","==", user?.email));
    }
    else if(option ===7){
      
    }
  }

  // once the postRef has been set based on the option value
  // this useCollection hook is used to listn to the firebase databse for any new docs added
  // and displays them in real time.
  const [posts, loadingPosts] = useCollection(postRef());
  
  // this setClas, useState related hook is used to diplay the sortby dropdown
  //when clas = "0px" is set the sortby drop down is not in action
  // when clas ="250px" is set the sortby drop down is shown to the users
  // to select the filters from
  const [clas, setClas] = useState("0px");
  
  //and this is the function which is responsible for the dropdown effect to happen
  const toggleClass = () => {
    setClas(clas === "0px" ? "250px" : "0px");
  };

  // this setSearch, useState hook is used for searching posts based on the skill tags.
  const [search,setSearch]=useState("")
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  // this setAppliedFlag, a useState hook is used for changing the css styles
  const [appliedFlag,setAppliedFlag]=useState({"display":"none"});

  useEffect(()=>{
    if (user?.email){
      setAppliedFlag({});
    }
  },[user])

  
  return (
    <div style={{ backgroundColor: "#fffefd" }}>
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
      </Head>{" "}
      <Script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"
      />
      <div
        className={styles.header}
        style={{
          background: "linear-gradient(to left, whitesmoke, aliceblue)",
        }}
      >
        <nav
          className="navbar fixed-top navbar-expand-lg"
          style={{ padding: "25px 0px" }}
        >
          <div className="container">
            <Link href="/">
              <a
                className="navbar-brand"
                style={{
                  float: "left",
                  margin_top: "-12px",
                  outline: "none",
                }}
              >
                <h2
                  className="eh2"
                  style={{
                    color: "#1e1e1e",
                    text_transform: "uppercase",
                    font_size: "24px",
                    font_weight: "900",
                    transition: "all .3s ease 0s",
                  }}
                >
                  <span
                    style={{
                      color: "#1e1e1e",
                      transition: "all 0.3s",
                    }}
                  >
                    <Link href="/">
                      <a style={{ textDecoration: "none" }}>proSpaces</a>
                    </Link>
                  </span>
                  <em></em>{" "}
                </h2>
              </a>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {user?(
              <div
              className="collapse navbar-collapse"
              id="navbarResponsive"
              style={{ z_index: "999", text_align: "center" }}
            >
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item"
                  style={{
                    margin: "0px 15px",
                    fontSize: "19px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#1e1e1e",
                    transition: "all 0.3s",
                  }}

                  onClick={()=>setOption(6)}
                >
                  <Link href='#'>
                    <a className="nav-link">My Posts</a>
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{
                    margin: "0px 15px",
                    textTransform: "uppercase",
                    fontSize: "19px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    color: "#1e1e1e",
                    transition: "all 0.3s",
                  }}
                >
                  <Link href="/newPost/createPost">
                    <a className="nav-link">newpost</a>
                  </Link>
                  
                </li>
              </ul>
              <Link href ="/">
                    <a  onClick={()=>signOut(auth)} className = "blue-button">Sign Out</a>
                </Link>
            </div>
            ):(
              <div><Link href = "/signUp">
              <a className = "blue-button">Get Started</a>
          </Link>
          <Link href = "/signIn">
              <a className = "white-button"> Sign In </a>
          </Link></div>
            )}
          </div>
        </nav>
      </div>
      <section className={(styles.blog_posts, "grid-system")}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <div
                className={
                  (styles.sidebar, styles.trending_section, styles.left_menu)
                }
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className={(styles.sidebar_item, styles.search)}>
                      <form id="search_form" name="gs" method="GET" action="#">
                        <input
                          id="username"
                          type="text"
                          name="q"
                          className={styles.searchText}
                          autoComplete="on"
                          onChange={handleSearch}
                          placeholder="search by tags &#xF002;&nbsp;"
                          style={{
                            fontFamily:
                              "'Lucida Console', Monaco, monospace, 'Font Awesome 5 Free'",
                          }}
                        />
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-lg-12"
                    style={{
                      marginTop: "40px",
                      textAlign: "center",
                    }}
                  >
                    {/* <div 
                      style ={appliedFlag}
                    className={styles.button_slide}>
                      APPLIED POSTS{" "}
                      <span>
                        {" "}
                        <i
                          className="far fa-check-circle"
                          style={{
                            color: "blue",
                            margin_left: "6px",
                            margin_right: "6px",
                            fontSize: "20px",
                          }}
                        ></i>
                      </span>{" "}
                    </div> */}
                  </div>
                  <div
                    className="col-lg-12"
                    style={{
                      marginTop: "40px",
                      textAlign: "center",
                    }}
                  > 
                    <nav className={styles.nav_new}>
                    
                      <span className={styles.span_new} onClick={toggleClass}>
                        sort by
                      </span>
                    
                      <div id="touch" onClick={toggleClass} />

                      <ul
                        className={styles.slide_new}
                        style={{
                          height: clas,
                        }}
                      >
                        <li className={styles.li_new}>
                          <a
                            href="#"
                            onClick={()=>{setOption(1)}}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Most Recent
                          </a>
                        </li>
                        <li className={styles.li_new}>
                          <a
                            href="#"
                            onClick={()=>{setOption(2)}}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Team Size(asc)
                          </a>
                        </li>
                        <li className={styles.li_new}>
                          <a
                            href="#"
                            onClick={()=>{setOption(3)}}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Team Size(desc)
                          </a>
                        </li>
                        <li className={styles.li_new}>
                          <a
                            href="#"
                            onClick={()=>{setOption(4)}}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Duration(asc)
                          </a>
                        </li>
                        <li className={styles.li_new}>
                          <a
                            href="#"
                            onClick={()=>{setOption(5)}}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Duration(desc)
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className={user ? "col-lg-8 mt-5" : "col-lg-10 mt-5"} style={{ marginTop: "0px", paddingTop: "50px", background: "linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5)", minHeight:"50rem"}}>
              <div
                className={styles.container_new}
                style={{ marginTop: "0px", paddingTop: "100px" }}
              >
                {posts?.docs?.filter((post)=>{
                  console.log(post)
                    if (search==""){
                      return post;
                    }
                      for (const skill in post.data()?.skills){
                        if (post.data()?.skills[skill].toLowerCase().includes(search.toLowerCase())){
                          return post;
                        }
                      }
                  })?.map((post) => (
                  <div className={styles.card_new} key={post.id}>
                    <div className={styles.card__body_new}>
                      {" "}
                      <div className={styles.card__footer_new}>
                        <div className={styles.user_new}>
                          <Image
                            width="80rem"
                            height="80rem"
                            src={post?.data()?.photo}
                            alt="user__image"
                            className={styles.user__image_new}
                          />
                          {console.log(post?.data()?.photoURL)}
                          <div className={styles.user__info_new}>
                            <h5> {post?.data()?.name}</h5>
                            <small>
                              {" "}
                              {
                                post?.data()?.timestamp
                                  ? (
                                    <TimeAgo datetime={post?.data()?.timestamp.toDate()} />
                                  ) : ("...")
                              }
                            </small>
                          </div>
                        </div>
                      </div>
                      <a
                        href={`http://localhost:3000/newPost/${post.id}`}
                        style={{ textDecoration: "none", color: "#1a4765" }}
                      >
                        <h5>{post.data().title}</h5>{" "}
                      </a>
                      <p>{post.data().goal}</p>

                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <div style={{ display: "flex", flexDirection: "row", flex: "left" }}>
                          <Tooltip color="primary" sx={{ width: "1.5rem", height: "1.5rem" }} title="Duration" arrow>
                            <AccessTimeIcon />
                          </Tooltip>
                          <p>&nbsp;{post.data().duration} Weeks</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", }}>
                          <Tooltip color="secondary" sx={{ width: "1.5rem", height: "1.5rem" }} title="Weekly Hours" arrow>
                            <HourglassEmptyIcon />
                          </Tooltip>
                          <p>&nbsp;{post.data().weeklyhrs} hrs/week</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Tooltip color="secondary" sx={{ width: "1.5rem", height: "1.5rem" }} title="Team Size" arrow>
                          <GroupsOutlinedIcon />
                        </Tooltip>
                        <p>&nbsp;{post.data().membercount} members</p>
                      </div>

                      <ul
                        className="posttags"
                        style={{
                          padding: "0",
                          margin_bottom: "5px",
                          padding_left: "5px",
                        }}
                      >
                        <li
                          style={{
                            display: "inline-block",
                            margin_right: "6px",
                          }}
                        >
                          <i
                            className="fa fa-tags"
                            style={{
                              color: "blue",
                              margin_left: "6px",
                              margin_right: "6px",
                            }}
                          ></i>
                        </li>
                        {post.data().skills.map((pst) => (
                          <li
                            key={pst.id}
                            style={{
                              display: "inline-block",
                              marginRight: "5px",
                              marginLeft: "5px",
                              marginTop: "3px",
                            }}
                          >
                            <a
                              href="#"
                              style={{
                                textDecoration: "none",
                                padding: "0.25em 0.75em",
                                borderRadius: "1em",
                                fontSize: "0.75rem",
                                background: "#d1913c",
                                background:
                                  "linear-gradient(to bottom, #ffd194, #d1913c)",
                                color: "#fafafa",
                              }}
                            >
                              {pst}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-2">
              <div
                className={
                  (styles.sidebar, styles.trending_section, styles.left_menu)
                }
              >
                {user ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <Image
                        src={chat}
                        alt="teamup"
                        width="500"
                        height="500"
                      />
                      <div
                        className="col-lg-12"
                        style={{
                          marginTop: "40px",
                          textAlign: "center",
                        }}
                      >
                        <div onClick={()=>{router.push('/chat/1')}} className={styles.button_slide}>
                          CHAT WITH OTHERS{" "}
                          <span>
                            {" "}
                            <i
                              className="fab fa-whatsapp"
                              style={{
                                color: "blue",
                                margin_left: "6px",
                                margin_right: "6px",
                                fontSize: "20px",
                              }}
                            ></i>
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (<div />)

                }

              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );

}

export default Posts;



