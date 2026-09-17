/* View Rounds Page */
function RoundPage({ rounds }) {
    return (
        <div className="round-page">
            {rounds.map((round) => (
                <div className="round-container" key={round.id}>
                    <p> {round.name} </p>
                    <p> Status: {round.status} </p>

                {round.status === "OPEN" ? (
                    <button> View Projects </button>
                ) : (
                    <p> This round is closed. </p>
                )}
                </div>
            ))}
        </div>
    );
}

export default RoundPage;