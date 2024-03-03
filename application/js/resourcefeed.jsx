import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import '../static/css/style.css';
import Resource from "./resource";

export default function ResourceFeed() {
    const [posts, setPosts] = useState([]);
    const [morePosts, setMorePosts] = useState(false);
    const [url, setUrl] = useState("/api/v1/posts/");
    const [booleanFetch, setBooleanFetch] = useState(true);

    useEffect(() => {
        let ignoreStaleRequest = false;
        if (!booleanFetch) {
        return () => {
            ignoreStaleRequest = true;
        };
        }
        fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            // do error handling
            if (!response.ok) {
            throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            if (!ignoreStaleRequest) {
            setBooleanFetch(false);
            }
            const postsToRender = json.results.map(({ postid }) => postid);
            setPosts(posts.concat(postsToRender));

            if (json.next !== "") {
            setUrl(json.next);
            setMorePosts(true);
            } else {
            setUrl("");
            setMorePosts(false);
            }
            return postsToRender;
        })
        .catch((error) => {
            console.log(error);
        });
        return () => {
        ignoreStaleRequest = true;
        };
    }, [booleanFetch, url, posts]);

    return (
        <div>
            <div className="feed-container">
                <Resource></Resource>
                <Resource></Resource>
                <Resource></Resource>
                <Resource></Resource>
            </div>
        {/* <InfiniteScroll
            dataLength={posts.length}
            // provide a fcn to be called to get the new posts
            next={() => setBooleanFetch(true)}
            loader={<h4>Loading...</h4>}
            morePosts={morePosts}
            endMessage={
            <p style={{ textAlign: "center" }}>
                <b>No More Posts Available</b>
            </p>
            }
        >
            <div>
            {posts.map((postid) => (
                <Post key={postid} postid={postid} />
            ))}
            </div>
        </InfiniteScroll> */}
        </div>
    );
}