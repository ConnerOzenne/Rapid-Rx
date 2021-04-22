import { render } from "react-dom"

export const FullMedSearch = props => {

    return <>
        <div className="m-5">
            <h1>Search Medications</h1>

            <label htmlFor="searchby">Search By</label>
            <select className="form-control col-6" 
                    id="homepage-med-searchby" 
                    name="searchby"
                    onChange= {event => this.setState({searchOption: event.target.value})}>
                {this.medInfo.map(sortOption => <option>{sortOption}</option>)}
            </select>

            <label htmlFor="search">Search</label>
            <input  type="search" 
                    id="home-med-search" 
                    name="search"
                    value={this.state.searchText}
                    onChange= {event => this.setState({searchText: event.target.value})}></input>
        </div>
        
    </>

}