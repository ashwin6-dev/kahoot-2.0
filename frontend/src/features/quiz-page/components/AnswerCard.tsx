const AnswerCard = ({ answer, color, onClick }) => {
    return (
        <div className={`transition all ease-in duration-300 flex p-16 justify-center items-center cursor-pointer bg-${color}`}
             onClick={onClick}>
            <p className="text-white text-4xl font-bold tracking-tighter">{ answer }</p>
        </div>
    )
}

export default AnswerCard;