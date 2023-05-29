
import Link from 'next/link';
import React from 'react';

export function playlists() {
  return (
    <div>
      <h2>Your Playlist</h2>
      <h3>In Progress...</h3>
      <ul>
      <li>
        <Link href="/">Generation Page</Link>
      </li>
      </ul>
    </div>
  );
};

export default playlists;
