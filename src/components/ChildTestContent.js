const ChildTestContent = ({test}) => {
    let text = "<Child ref={this.childRef} />";
    return (
        <>
            <h2 className="context-title">Day la trang test component, test code</h2>
            {test}
            <br/>
            <span className="context-paragraph">test truyen component trong prop va goi lai trong other component</span>
            <span className="context-paragraph">goi cac function, state cua child component trong parent component trong qua {text}</span>
        </>
    );
};

export default ChildTestContent;
