
// const Post = styled.div``;


import chat from '../../public/chat.svg';
import styles from "./index.module.css";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useState, useEffect } from "react";
import TimeAgo from "timeago-react";
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client"
import {GET_POSTS,USER_POSTS} from "../../graphql/client/queries"
import pic from "../../public/profilepic.png"
import {AuthContext} from "../../context/auth"
import {useContext} from "react"
function Posts() {

  

    // the useAuthState hook is used for maintaining the user status, whether he is logged in or not.
    // it also returns a loading state which tells us that whether the user is logged in or not
    // (i.e) as this hook returns a promise, the loading is set to true if there is no user status,
    // and false once we get the user is logged in
    // Note: that this hook is also decalred and used in other files, 
    //so the above expalnation holds true for those files too.
    const {user,logOut} = useContext(AuthContext);

    // this hook is used to populate option based on the user selection in the filter section
  const [option,setOption] = useState(0);

    //This [id].js is a dynamic page and the id gets populated when a id is passed as a
    // prop to the page. We can get the id value from the useRouter hook defined in Nextjs docs.
    // this is the useRouter hook 
  const router = useRouter();

 

  // the postRef is a reference to the posts collection in the firebase
  // the reference to the collection changes based on the filter selection.
  const orderByOptions = ()=>{
    if(option === 0){
      // this is when no filter is selected
      return {variables:{orderBy:null}};
    }
    else if(option === 1){
      // this is when the latest filter is selected
      return {variables:{orderBy:{createdAt:"desc"}}};
    }
    else if(option === 2){
       // this is when the teamsize(ascending) filter is selected
      return {variables:{orderBy:{membercount:"asc"}}}
    }
    else if(option === 3){
      // this is when the teamsize(descending) filter is selected
      return {variables:{orderBy:{membercount:"desc"}}}
    }
    else if(option === 4){
      // this is when the duration(ascending) filter is selected
      return {variables:{orderBy:{duration:"asc"}}}
    }
    else if(option === 5){
      // this is when the duration(descending) filter is selected
      return {variables:{orderBy:{duration:"desc"}}}
    }
    else if(option === 6){
       // this is when the my posts button is clicked
      return {variables:{filter:user?.user_id}};
    }
  }

  // useEffect(()=>{

  // },[option])
  // once the postRef has been set based on the option value
  // this useCollection hook is used to listn to the firebase databse for any new docs added
  // and displays them in real time.
  //const [posts, loadingPosts] = useCollection(postRef());
  
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

    const {loading1, error, data} = useQuery(GET_POSTS,orderByOptions());
    if(loading1) return <p>Loading...</p>
  

  // const {loading2,err,data1} = useQuery(USER_POSTS,{variables:{email:user?.email}});
  // if(!loading2) console.log(data1);
  
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
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"
        integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2"
        crossOrigin="anonymous"
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
                    <a  onClick={()=>logOut()} className = "blue-button">Sign Out</a>
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
                {
                data?.posts?.filter((post)=>{
                    if (search==""){
                      return post;
                    }
                      for (const skill in post?.skills){
                        if (post?.skills[skill].toLowerCase().includes(search.toLowerCase())){
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
                            src={pic}
                            alt="user__image"
                            className={styles.user__image_new}
                          />
                          
                          <div className={styles.user__info_new}>
                            <h5> {post?.postedBy?.name}</h5>
                            <small>
                              {" "}
                              {
                                post?.createdAt
                                  ? (
                                    <TimeAgo datetime={post?.createdAt} />
                                  ) : ("...")
                              }
                            </small>
                          </div>
                        </div>
                      </div>
                      <a
                        href={`https://fsd-project.vercel.app/newPost/${post?.id}`}
                        style={{ textDecoration: "none", color: "#1a4765" }}
                      >
                        <h5>{post?.title}</h5>{" "}
                      </a>
                      <p>{post?.goal}</p>

                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <div style={{ display: "flex", flexDirection: "row", flex: "left" }}>
                          <Tooltip color="primary" sx={{ width: "1.5rem", height: "1.5rem" }} title="Duration" arrow>
                            <AccessTimeIcon />
                          </Tooltip>
                          <p>&nbsp;{post?.duration} Weeks</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", }}>
                          <Tooltip color="secondary" sx={{ width: "1.5rem", height: "1.5rem" }} title="Weekly Hours" arrow>
                            <HourglassEmptyIcon />
                          </Tooltip>
                          <p>&nbsp;{post?.weeklyhrs} hrs/week</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <Tooltip color="secondary" sx={{ width: "1.5rem", height: "1.5rem" }} title="Team Size" arrow>
                          <GroupsOutlinedIcon />
                        </Tooltip>
                        <p>&nbsp;{post?.membercount} members</p>
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
                        {post?.skills?.map((pst) => (
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
          </div>
        </div>
      </section>{" "}
    </div>
  );

}

export default Posts;



