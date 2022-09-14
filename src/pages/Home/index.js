import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader";
import { logout } from "../../store/actions/auth";
import { setDataLoading, getCards } from "../../store/actions/cards";
import grid from "../../assets/icons/grid.svg";
import menu_icon from "../../assets/icons/menu.svg";
import filter_icon from "../../assets/icons/filter.svg";
import search from "../../assets/icons/search.svg";
import "./index.css";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";

function Home({ cards, auth, getCards, setDataLoading, ...props }) {
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filters, setFilters] = useState({});
  const [typeBurnerFilter, setTypeBurnerFilter] = useState(false);
  const [typeSubFilter, setTypeSubFilter] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getCards({ page, limit: 10, new: true });
  }, []);

  // infinite scroll data loading
  const handleScroll = (e) => {
    if (!props.loading && !props.noMoreCards) {
      setDataLoading(true);
      getCards({ page: page + 1, limit: 10, ...getFilter(filters) });
      setPage((page) => page + 1);
    }
  };
  // geerate filter params from state
  const getFilter = (filters = {}, tabIndex = -1) => {
    let filter = { ...filters };
    tabIndex = tabIndex != -1 ? tabIndex : tab;
    if (tabIndex === 0) filter.owner_id = auth.user.owner_id;
    if (tabIndex === 2) filter.status = "blocked";
    return filter;
  };

  const handleTabChange = (currentTab) => {
    setTab(currentTab);
    setPage(1);
    getCards({
      page: 1,
      limit: 10,
      new: true,
      ...getFilter(filters, currentTab),
    });
  };
  // Update cards using filter modal data
  const handleFilterUpdate = (status, search) => {
    filters.card_types = [];
    if (!status) {
      setTypeBurnerFilter(filters.card_types.includes("burner"));
      setTypeSubFilter(filters.card_types.includes("subscription"));
    } else {
      typeBurnerFilter && filters.card_types.push("burner");
      typeSubFilter && filters.card_types.push("subscription");
    }
    initNewData(filters);
  };

  const initNewData = (filters) => {
    setFilters(filters);
    setPage(1);
    getCards({ page: 1, limit: 10, new: true, ...getFilter(filters) });
    setFilterOpen(false);
  };

  const handleSearchSubmit = (clear = false) => {
    let text = clear ? "" : searchInput;
    setSearchInput(text);
    if ((filters.query || "") !== text.trim()) {
      filters.query = text.trim();
      initNewData(filters);
    }
  };

  // Render tab Item
  const renderTab = (text, index) => (
    <span
      key={index}
      onClick={(e) => handleTabChange(index)}
      className={`filter-tab ${tab === index && "filter-tab-active"}`}
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
          <img src={grid} alt="" />
          <img src={menu_icon} onClick={(e) => setMenu(!menu)} alt="test" />
          {menu && (
            <div className="user-menu">
              <span onClick={(e) => props.logout()}>Logout</span>
            </div>
          )}
        </div>
      </div>
      <div className="filter-sub-menu">
        <div className="search-filter-options">
          <div className="search-container">
            <SearchInput
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
          </div>
          <div
            className="search-dropdown"
            onClick={(e) => setFilterOpen(!filterOpen)}
          >
            <img src={filter_icon} alt="" />
            <span>Filter</span>
          </div>
          {filterOpen && (
            <div className="filter-modal">
              <p className="filter-modal-head ">Filter</p>
              <div className="filter-modal-options">
                <p className="fitler-modal-label">Type</p>
                <div className="row filter-type-options">
                  <div className="col s6 filter-type-option">
                    <input
                      type="checkbox"
                      checked={typeBurnerFilter}
                      onChange={(e) => setTypeBurnerFilter(!typeBurnerFilter)}
                    />
                    <span>Burner</span>
                  </div>
                  <div className="col s6 filter-type-option">
                    <input
                      type="checkbox"
                      checked={typeSubFilter}
                      onChange={(e) => setTypeSubFilter(!typeSubFilter)}
                    />
                    <span>Subscription</span>
                  </div>
                </div>
                {/* TODO: We don't have data to apply this filter */}
                <p className="fitler-modal-label">Cardholder</p>
                <div className="filter-cardholder-options">
                  <select
                    className="form-select"
                    aria-label="Select Cardholder"
                    defaultValue={""}
                    disabled
                  >
                    <option value="">Select Cardholder</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div className="filter-actions row">
                  <div className="col lg6">
                    <Button
                      text="Apply"
                      color={"white"}
                      background={"#ff3266"}
                      onClick={(e) => handleFilterUpdate(true)}
                    />
                  </div>
                  <div className="col lg6">
                    <Button
                      text="Clear"
                      color={"black"}
                      background={"white"}
                      onClick={(e) => handleFilterUpdate(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cards-list">
        <InfiniteScroll
          dataLength={cards}
          next={handleScroll}
          hasMore={!props.noMoreCards}
        >
          <div className="row list-wrapper">
            {cards.map((card, index) => (
              <Card card={card} key={index} />
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

export default connect(mapStateToProps, { getCards, setDataLoading, logout })(
  Home
);
