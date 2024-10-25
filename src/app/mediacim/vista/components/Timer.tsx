export const Timer = ({ publicaciones }: any, currentImageIndex: any) => {

    const total = publicaciones.length
    return (
        <div>
            <div className="flex items-center justify-center z-30 absolute border border-white w-10 h-7 rounded-sm top-5 right-3 opacity-70 bg-slate-50 text-neutral-950">{currentImageIndex + 1}/{total}</div>
        </div>
    )
}