
const SHOW_TOP = 5;

const Leaderboard = ({ leaderboard }) => {
    return <div className="space-y-4 flex-grow w-full md:w-96 lg:w-64">
        {
            leaderboard.slice(0, SHOW_TOP).map((player, i) =>
                <div className="text-white p-2 border-4 border-white">
                    <div className="flex text-2xl font-bold tracking-tighter">
                        <div className="w-3/4">{i + 1}. { player.name }</div>
                        <div className="ml-auto">{ player.score }</div>
                    </div>
                </div>)
        }
    </div>
}

export default Leaderboard;