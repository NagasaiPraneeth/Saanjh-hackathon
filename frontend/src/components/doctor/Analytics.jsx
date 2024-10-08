export default function Analytics(props){
  return(
      <div className="layout-content-container flex flex-col w-[360px]">
      <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Analytics</h3>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0dbe6]">
          <p className="text-[#0e141b] text-base font-medium leading-normal">Total Patients</p>
          <p className="text-[#0e141b] tracking-light text-2xl font-bold leading-tight">{props.noofPatients}</p>
          <p className="text-[#078838] text-base font-medium leading-normal">{props.patientPercentage}</p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#d0dbe6]">
          <p className="text-[#0e141b] text-base font-medium leading-normal">Average Age</p>
          <p className="text-[#0e141b] tracking-light text-2xl font-bold leading-tight">{props.averageAge}</p>
          <p className="text-[#e73908] text-base font-medium leading-normal">{props.agePercentage}</p>
        </div>
      </div>
    </div>
  )
}