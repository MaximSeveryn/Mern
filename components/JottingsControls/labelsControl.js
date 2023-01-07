import ProgressSpinner from "../ProgressSpinner/progressSpinner";
// import CreateNoteButton from "../CreateJottingButton/createNoteButton";
import LabelList from "../LabelList/labelList";
import jottingsControl from "./jottingsControl.module.css";
import { useWindowSize } from "../../libs/view";
import CreateLabelButton from "../CreateJottingButton/createLabelButton";

/**
 * Control for Labels heading,
 * list for view user labels, and
 * button to create label
 * @param { { notesState: [notes, setNotes] } } props
 * @param props.labelsState The array returned from useState for the notes state
 * @param props.notesState[0] The value of notes
 * @param props.notesState[1] The Dispatch to set a new value to the notes state
 */
export default function LabelsControl({labelsState, active}) {
    const [labels, setLabels] = labelsState;

	return (
		<article className={`${active ? "active" : ""} ${jottingsControl.labelList}`}>
			<h1>Labels</h1>
			{labels ? <LabelList labels={labels} /> : <ProgressSpinner />}
			<CreateLabelButton labels={labels} />
		</article>
	);
}