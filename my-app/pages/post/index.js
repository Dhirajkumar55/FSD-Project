import { useEffect, useState } from "react";
import styles from "./index.module.css";
import NavBar from "../../components/navbar/Navbar.js";
import Head from "next/head";

function Post() {
  const url = "http://localhost:8000/posts";
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getdata() {
      const res = await fetch(url);
      const jsonData = await res.json();
      setData(jsonData);
      console.log(jsonData);
    }
    getdata();
  }, []);

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
        <script
          type="text/javascript"
          src="http://gc.kis.v2.scr.kaspersky-labs.com/FD126C42-EBFA-4E12-B309-BB3FDD723AC1/main.js?attr=mc_7o8dQE-DdW4ZUaQTiasiJekYoD5FV3InHLGayTaFIlM47eIbqZdQS7mDVRZmW"
          charset="UTF-8"
        ></script>{" "}
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossorigin="anonymous"
        ></script>{" "}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
          crossorigin="anonymous"
        ></script>{" "}
      </Head>{" "}
      <div className={styles.header}>
        <nav
          class="navbar fixed-top navbar-expand-lg"
          style={{ padding: "25px 0px" }}
        >
          <div class="container">
            <a
              class="navbar-brand"
              href="/"
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
                <span style={{ textTransform: "capitalise" }}>proSpaces</span>
                <em></em>{" "}
              </h2>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse"
              id="navbarResponsive"
              style={{ z_index: "999", text_align: "center" }}
            >
              <ul class="navbar-nav ml-auto">
                <li
                  class="nav-item"
                  style={{
                    margin: "0px 15px",
                    textTransform: "capitalize",
                    fontSize: "19px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#1e1e1e",
                    transition: "all 0.3s",
                  }}
                >
                  <a class="nav-link" href="/signIn">
                    My projects
                  </a>
                </li>
                <li class="nav-item" style={{ margin: "0px 15px" }}>
                  <a
                    class="nav-link"
                    href="/post/Projectpost"
                    style={{
                      textTransform: "capitalize",
                      fontSize: "19px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#1e1e1e",
                      transition: "all 0.3s",
                    }}
                  >
                    newpost
                  </a>
                </li>
              </ul>
            </div>
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
                          type="text"
                          name="q"
                          className={styles.searchText}
                          placeholder="type to search..."
                          autocomplete="on"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 mt-5" style={{ margin_top: "30px" }}>
              <div className={styles.blogs_section}>
                <div className="row">
                  {data.map((post) => (
                    <div className="col-lg-6">
                      <div className={styles.blog_post}>
                        <div>
                          <a
                            href={`http://localhost:3000/post/${post.id}`}
                            className={styles.title}
                          >
                            {post.title}
                          </a>
                          <div
                            style={{ marginTop: "5px", marginBottom: "5px" }}
                          >
                            <b>Goal : </b> {post.goal}
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
                            {post.skills.map((pst) => (
                              <li
                                style={{
                                  display: "inline-block",
                                  marginRight: "5px",
                                  marginLeft: "5px",
                                  marginTop: "3px",
                                }}
                              >
                                <a href="#" style={{ color: "brown" }}>
                                  {pst}
                                </a>
                              </li>
                            ))}
                          </ul>
                          <ul className={styles.postinfo}>
                            <li className={styles.listinfo}>
                              {post.membercount} members required
                            </li>
                            <li className={styles.listinfo}>
                              {post.duration} weeks duration
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div
                className={
                  (styles.sidebar, styles.trending_section, styles.menu_right)
                }
              >
                <div className="row"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Post;
