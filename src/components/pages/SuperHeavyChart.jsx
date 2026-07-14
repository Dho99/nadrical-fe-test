
const SuperHeavyChart = ({ data }) => {
  // Anggap komponen ini mengimpor library chart pihak ketiga berukuran 2MB
  console.log("Render SuperHeavyChart: Komponen 2MB dimuat.");

  return (
    <div style={{ background: '#ddd', height: '200px', marginTop: '20px' }}>
      <h3>Grafik Super Berat</h3>
      <p>Total Data: {data?.total}</p>
    </div>
  );
};

export default SuperHeavyChart;