import React from 'react';
import SidebarEntry from './SidebarEntry.jsx';

const Sidebar = (props) => (
  <div className="tableView">
    <ul>
      {Object.keys(props.filteredListings).map((listingId) => {
        const entry = (
          <div>
            <SidebarEntry key={listingId} listing={props.filteredListings[listingId]} />
            <br />
          </div>
        );

        const hasCoordinates = props.filteredListings[listingId].lat &&
          props.filteredListings[listingId].distanceToHackReactor;

        // Only render the entry if it has the distance
        return hasCoordinates ? entry : ' ';
      }
      )}
    </ul>
  </div>
);

Sidebar.propTypes = {
  filteredListings: React.PropTypes.object,
};

export default Sidebar;
