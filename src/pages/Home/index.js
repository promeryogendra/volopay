import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./index.css";
import { getCards } from "../../store/actions/cards";
import Loader from "../../components/Loader";
import { connect } from "react-redux";
import { setDataLoading } from "../../store/actions/cards";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 80,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};
function Home({ cards, auth, getCards, setDataLoading, ...props }) {
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCards({ page, limit: 10, new: true });
  }, []);
  const handleScroll = (e) => {
    if (!props.loading && !props.noMoreCards) {
      setDataLoading(true);
      getCards({ page: page + 1, limit: 10, ...getFilter() });
      setPage((page) => page + 1);
    }
  };
  console.log(props.loading, props.noMoreCards, 33333);
  const getFilter = () => {
    let filter = {};
    if (tab == 0) filter.owner_id = auth.user.owner_id;
    if (tab == 2) filter.status = "blocked";
    return filter;
  };

  const handleTabChange = (tab) => {
    setTab(tab);
    setPage(1);
    getCards({ page: 1, limit: 10, new: true, ...getFilter() });
  };
  const renderTab = (text, index) => (
    <span
      key={index}
      onClick={(e) => handleTabChange(index)}
      className={`filter-tab ${tab == index && "filter-tab-active"}`}
    >
      {text}
    </span>
  );
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="filter-menu">
        <div className="filter-tabs">
          {renderTab("Your", 0)}
          {renderTab("All", 1)}
          {renderTab("Blocked", 2)}
        </div>
        <div className="filter-options">
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div className="filter-sub-menu">Search menu</div>
      <div className="cards-list">
        <InfiniteScroll
          dataLength={cards}
          next={handleScroll}
          hasMore={!props.noMoreCards}
        >
          <div class="row list-wrapper">
            {cards.map((i, index) => (
              <div class="single-card col-sm-12 col-lg-6" key={index}>
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{i.name}</h5>
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {props.loading && (
          <div className="cards-loading">
            <Loader />
          </div>
        )}
        {props.noMoreCards && <p className="no-more-content">No more cards</p>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.cards.loading,
    cards: state.cards.cards,
    noMoreCards: state.cards.noMoreCards,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getCards, setDataLoading })(Home);
