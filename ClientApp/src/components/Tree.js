﻿import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

const data = {
    '/root': {
        path: '/root',
        type: 'folder',
        isRoot: true,
        children: ['/root/david', '/root/jslancer'],
    },
    '/root/david': {
        path: '/root/david',
        type: 'folder',
        children: ['/root/david/readme.md'],
    },
    '/root/david/readme.md': {
        path: '/root/david/readme.md',
        type: 'file',
        content: 'Thanks for reading me me. But there is nothing here.'
    },
    '/root/jslancer': {
        path: '/root/jslancer',
        type: 'folder',
        children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
    },
    '/root/jslancer/projects': {
        path: '/root/jslancer/projects',
        type: 'folder',
        children: ['/root/jslancer/projects/treeview'],
    },
    '/root/jslancer/projects/treeview': {
        path: '/root/jslancer/projects/treeview',
        type: 'folder',
        children: [],
    },
    '/root/jslancer/vblogs': {
        path: '/root/jslancer/vblogs',
        type: 'folder',
        children: [],
    },
};

export default class Tree extends Component {

    state = {
        nodes: [],
    };

    componentDidMount() {
    fetch('api/tasks')
        .then(response => response.json())
            .then(data => this.setState({ nodes: data }));
    }   

    //componentDidUpdate() {
    //    fetch('api/tasks')
    //        .then(response => response.json())
    //        .then(data => this.setState({ nodes: data }));

    //}   

    getRootNodes = () => {
        const { nodes } = this.state;
        return values(nodes).filter(node => node.isRoot === true);
    }

    getChildNodes = (node) => {
        const { nodes } = this.state;
        if (!node.children) return [];
        var c = node.children.map(id => nodes.find(x => x.id === id));
        return c;
    }

    onToggle = (node) => {
        const { nodes } = this.state;
        nodes.find(x => x.id === node.id).isOpen = !node.isOpen;
        this.setState({ nodes });
    }

    onNodeSelect = node => {
        const { onSelect } = this.props;
        onSelect(node);
    }

    render() {
        const nodes = this.getRootNodes();
        return (
            <div>
                {nodes.map(node => (
                    <TreeNode
                        node={node}
                        getChildNodes={this.getChildNodes}
                        onToggle={this.onToggle}
                        onNodeSelect={this.onNodeSelect}
                    />
                ))}
            </div>
        )
    }
}

Tree.propTypes = {
    onSelect: PropTypes.func.isRequired,
};