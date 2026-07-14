import React from "react";

// Komponen ini sudah dibungkus React.memo agar tidak re-render jika props tidak berubah
const DataItem = React.memo(({ user, onDelete }) => {
    // Console log ini akan terus muncul saat user ngetik pencarian di parent. Ini BUG (Bug 6)!
    console.log(`Render DataItem: ${user.name}`);

    return (
        <div
            style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
        >
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <button onClick={() => onDelete(user.id)}>Hapus</button>
        </div>
    );
});

export default DataItem;
