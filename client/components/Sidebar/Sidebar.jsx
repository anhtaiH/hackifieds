import React from 'react';
import SidebarEntry from './SidebarEntry.jsx';

const Sidebar = (props) => (
  <div className="tableView">
    <ul>
      {Object.keys(props.filteredListings).map((listingId) => {
        let entry;
        if (props.filteredListings[listingId].lat &&
          props.filteredListings[listingId].distanceToHackReactor
        ) {
          entry = (
            <div>
              <SidebarEntry key={listingId} listing={props.filteredListings[listingId]} />
              <br />
            </div>
          );
        } else {
          entry = ' ';
        }

        return (
          entry
        );
      }
      )}
    </ul>
  </div>
);

Sidebar.propTypes = {
  filteredListings: React.PropTypes.object,
};

export default Sidebar;
