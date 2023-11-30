import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { TreeView } from '@grapecity/wijmo.react.nav';
import { ComboBox } from '@grapecity/wijmo.react.input';
import { Globalize } from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: [1, 2, 3],
            nodesPerLevel: [5, 10, 20, 40],
            selectedLevel: 2,
            selectedNodesPerLevel: 5,
            nodeCount: null,
            bindingTime: null
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <label htmlFor="cmbLevels">Levels:</label>
                        <ComboBox id="cmbLevels" itemsSource={this.state.levels} selectedValue={this.state.selectedLevel} selectedIndexChanged={s => {
            this.setState({ selectedLevel: s.selectedValue });
        }}/>
                        <br />
                        <label htmlFor="cmbNodesPerLevel">Nodes/Level:</label>
                        <ComboBox id="cmbNodesPerLevel" itemsSource={this.state.nodesPerLevel} selectedValue={this.state.selectedNodesPerLevel} selectedIndexChanged={s => {
            this.setState({ selectedNodesPerLevel: s.selectedValue });
        }}/>
                        <br />
                        <label></label>
                        <button className="btn btn-primary" onClick={() => this.refresh(true)}>
                            Bind Tree
                        </button>
                        <div style={this.state.showBindingMsg ? {} : { display: 'none' }}>
                            Bound to <b>{this.state.nodeCount}</b> items in <b>{this.state.bindingTime}</b> ms.
                        </div>
                    </div>
                    <div className="col-xs-7">
                        <TreeView displayMemberPath="header" childItemsPath="items" initialized={s => {
            this._treeView = s;
            this.refresh(false);
        }}/>
                    </div>
                </div>
            </div>);
    }
    refresh(show) {
        let start = Date.now();
        let tree = this._treeView;
        tree.itemsSource = this.getTreeData(this.state.selectedNodesPerLevel, this.state.selectedLevel);
        tree.loadTree(); // force immediate refresh
        this.setState({
            showBindingMsg: show,
            nodeCount: Globalize.format(tree.totalItemCount, 'n0'),
            bindingTime: Globalize.format(Date.now() - start, 'n0'),
        });
    }
    getTreeData(cnt, levels) {
        var nodes = [];
        for (var i = 0; i < cnt; i++) {
            nodes.push(this.getNode(0, i, cnt, levels));
        }
        return nodes;
    }
    getNode(level, id, cnt, levels) {
        // create node
        let node = {
            items: [],
            header: "Node " + (level + 1) + "." + (id + 1)
        };
        // create child nodes
        if (level < levels - 1) {
            node.items = [];
            for (var i = 0; i < cnt; i++) {
                node.items.push(this.getNode(level + 1, i, cnt, levels));
            }
        }
        return node;
    }
}
setTimeout(() => {
    const container = document.getElementById('app');
    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
    }
}, 100);
export default App; 