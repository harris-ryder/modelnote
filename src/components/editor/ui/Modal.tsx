import Button from "../../ui/standard-button";

export function Modal() {

  return (
    <>

      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-sky-100  border border-sky-200 pointer-events-auto rounded flex-col items-center gap-2 flex shadow-level1"
      >
        <Button isLoading={true} size={'lg'} className="px-12">Loading</Button>
      </div>
    </>
  );
}
