import React from "react";
import { Link } from "react-router-dom";
import s from "../stylesheets/Welcome.module.css";

function Welcome() {
  return (
    <div className={s.container}>
      <div>
        <div>
          <img
            src="https://cutewallpaper.org/21/pokemon-logo-pixel-art/pokemon-Cool-kawaii-logo-pixel-transparent-inneedofyourvoice-.gif"
            alt="logo"
            id={s.logo}
          />
        </div>
        <Link to={"/home"}>WELCOME!</Link>
      </div>

      <img src="https://i.gifer.com/ZF6P.gif" alt="luxray" id={s.luxray} />
      <img
        src="https://i.gifer.com/ZDch.gif"
        alt="blastoise"
        id={s.blastoise}
      />
      <img
        src="https://pokemin.carrd.co/assets/images/image46.gif?v57251256765751"
        alt="mewtwo"
        id={s.mewtwo}
      />
      <img
        src="https://i.gifer.com/origin/fe/fe4ebd8a9c0547e94000a9c759acf591.gif"
        alt="bulbasaur"
        id={s.bulbasaur}
      />
      <img
        src="http://pa1.narvii.com/6435/a5fd4fbab76fa68015adb9a837cc947eba6f54d9_00.gif"
        alt="charmander"
        id={s.charmander}
      />
      <img src="https://i.gifer.com/4bXB.gif" alt="pikachu" id={s.pikachu} />
      <img
        src="https://i.gifer.com/origin/d8/d83e9951f28fc811c1166b16dcaec930_w200.gif"
        alt="squirtle"
        id={s.squirtle}
      />
      <img
        src="https://thumbs.gfycat.com/AgileIncompleteBudgie-max-1mb.gif"
        alt="growlithe"
        id={s.growlithe}
      />
      <img
        src="https://24.media.tumblr.com/0b8730a22d52a2e82cbde09c447dc00b/tumblr_msu13zuFZ31scncwdo1_500.gif"
        alt="totodile"
        id={s.totodile}
      />
      <img
        src="https://24.media.tumblr.com/7b1003c806a9bbb724ea6066c2abaa54/tumblr_ml5pj2vcTR1s5h198o1_500.gif"
        alt="poliwhirl"
        id={s.poliwhirl}
      />
      <img
        src="https://64.media.tumblr.com/tumblr_m309yzdquq1qc3fjso1_500.gifv"
        alt="charizard"
        id={s.charizard}
      />
      <img
        src="https://thumbs.gfycat.com/HeavyHandsomeAlbino-max-1mb.gif"
        alt="vaporeon"
        id={s.vaporeon}
      />
      <img
        src="https://66.media.tumblr.com/tumblr_maorewZFZM1rfjowdo1_500.gif"
        alt="pidgeotto"
        id={s.pidgeotto}
      />
      <img
        src="http://pa1.narvii.com/6318/cd971746e2e55abe2145c54e00f4fc726f61e79b_00.gif"
        alt="character"
        id={s.character}
      />
      <img
        src="https://64.media.tumblr.com/20624ce96d9d4df7581d018b7b66f78d/e7638102a47e4ee5-91/s250x400/0381925f9bc4c4f46771c46e4e3a2d94f2b9ed53.gifv"
        alt="character"
        id={s.character2}
      />
      <img
        src="http://pa1.narvii.com/6796/d8858e8da355da7e0b621e2a3fbe299d8d6f4c68_00.gif"
        alt="character"
        id={s.character3}
      />
    </div>
  );
}

export default Welcome;
