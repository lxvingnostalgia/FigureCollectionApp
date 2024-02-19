// Main.js
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import firstSticker from './Images/sticker_7.png';
import secondSticker from './Images/sticker_5.png';
import thirdSticker from './Images/sticker_6.png';
import './style.css';

function Main() {
  const { isAuthenticated, username } = useAuth();

  useEffect(() => {
    // Can add specific actions when the auth status changes
  }, [isAuthenticated]);

  return (
    <div className="bg-dark p-4 col-md-8 mx-auto text-center inner-border">
      {isAuthenticated && <h2 className="text-white">Welcome, {username}!</h2>}

      <p className="text-white main-font">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus, nulla in viverra volutpat, est nisl dictum ante, ut mollis augue lorem aliquet neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas rhoncus ipsum turpis, ut maximus diam egestas eget. Phasellus dui lectus, ullamcorper at ullamcorper cursus, malesuada quis dui. Phasellus consectetur felis id lacus tincidunt efficitur. Phasellus consequat sapien ac sem venenatis elementum. Quisque a nisi lacus. Proin vehicula scelerisque fringilla. Sed id tristique neque, vel blandit nunc. Morbi tempor libero nunc, sit amet feugiat magna tincidunt in.
      </p>
      <br />
      <p className="text-white main-font">
        Sed pharetra semper arcu, ut suscipit velit rhoncus id. Integer id semper ex, id hendrerit lacus. Aenean ac elit tempor, pulvinar velit sed, accumsan tellus. Vivamus est enim, viverra a nisi eu, viverra facilisis erat. Fusce scelerisque elit nec pretium interdum. Sed id gravida ipsum. Mauris vulputate, enim quis blandit ultrices, elit arcu iaculis diam, id tincidunt nisi tellus et mi. Praesent suscipit pulvinar neque non dignissim. Etiam ipsum ligula, faucibus et nulla vitae, commodo consectetur urna. Ut faucibus nisl vehicula tellus molestie, ut luctus urna ornare. Duis ullamcorper non mi nec lobortis. Aliquam erat volutpat. Mauris a neque iaculis, porta risus et, pharetra odio.
      </p>
      <div className="d-flex justify-content-center">
        <img src={firstSticker} alt="Sticker 1" className="img-fluid p-2 max-img" />
        <img src={secondSticker} alt="Sticker 2" className="img-fluid p-2 max-img" />
        <img src={thirdSticker} alt="Sticker 3" className="img-fluid p-2 max-img" />
      </div>
    </div>
  );
}

export default Main;
