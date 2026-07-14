const SuperHeavyChart = ({ data }) => {
    // Anggap komponen ini mengimpor library chart pihak ketiga berukuran 2MB
    console.log("Render SuperHeavyChart: Komponen 2MB dimuat.");
    return (
        <div className="w-full bg-[#ddd] h-[200px] mt-[20px]">
            <h3>Grafik Super Berat</h3>
            <p>Total Data: {data?.total}</p>
        </div>
    );
};

export default SuperHeavyChart;
