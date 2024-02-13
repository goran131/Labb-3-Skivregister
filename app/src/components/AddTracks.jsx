import { useRef } from 'react'

function AddTracks() {
    const moreTracksDiv = useRef(null)

    const addMoreTracks = () => {
        moreTracksDiv.current.style.display = 'block'
    }

    return (
        <>
            <div>
                <br />
                <p>
                    <strong>Låtar</strong>
                </p>
                <div>
                    <label htmlFor="track1">&nbsp;1:</label>
                    <input
                        type="text"
                        name="track1"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track2">&nbsp;2:</label>
                    <input
                        type="text"
                        name="track2"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track3">&nbsp;3:</label>
                    <input
                        type="text"
                        name="track3"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track4">&nbsp;4:</label>
                    <input
                        type="text"
                        name="track4"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track5">&nbsp;5:</label>
                    <input
                        type="text"
                        name="track5"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track6">&nbsp;6:</label>
                    <input
                        type="text"
                        name="track6"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track7">&nbsp;7:</label>
                    <input
                        type="text"
                        name="track7"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track8">&nbsp;8:</label>
                    <input
                        type="text"
                        name="track8"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track9">&nbsp;9:</label>
                    <input
                        type="text"
                        name="track9"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track10">10:</label>
                    <input
                        type="text"
                        name="track10"
                        className="textInput tracks"
                    />
                </div>
            </div>
            <br />
            <button type="button" onClick={addMoreTracks}>
                Lägg till fler låtar
            </button>
            <br />
            <div ref={moreTracksDiv} className="notVisible">
                <div>
                    <label htmlFor="track11">&nbsp;11:</label>
                    <input
                        type="text"
                        name="track11"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track12">&nbsp;12:</label>
                    <input
                        type="text"
                        name="track12"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track13">&nbsp;13:</label>
                    <input
                        type="text"
                        name="track13"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track14">&nbsp;14:</label>
                    <input
                        type="text"
                        name="track14"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track15">&nbsp;15:</label>
                    <input
                        type="text"
                        name="track15"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track16">&nbsp;16:</label>
                    <input
                        type="text"
                        name="track16"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track17">&nbsp;17:</label>
                    <input
                        type="text"
                        name="track17"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track18">&nbsp;18:</label>
                    <input
                        type="text"
                        name="track18"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track19">&nbsp;19:</label>
                    <input
                        type="text"
                        name="track19"
                        className="textInput tracks"
                    />
                </div>
                <div>
                    <label htmlFor="track20">20:</label>
                    <input
                        type="text"
                        name="track20"
                        className="textInput tracks"
                    />
                </div>
            </div>
        </>
    )
}

export default AddTracks
