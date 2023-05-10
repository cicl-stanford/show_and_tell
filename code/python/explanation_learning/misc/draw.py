import matplotlib.pyplot as plt
import networkx as nx
from PIL import Image, ImageOps, ImageDraw, ImageFont
import itertools
import numpy as np


def draw_graph(graph):
    """
    Given a DiGraph with nodes A, B, C, returns an Image with arrows between them.
    The returned Image is 800x800.
    """
    pos = {'A': [0, 3 ** .5 / 4], 'B': [-.5, -3 ** .5 / 4], 'C': [.5, -3 ** .5 / 4]}
    fig = plt.figure(figsize=(8, 8))
    nx.draw(graph,
            pos=pos,
            node_color="#E5E5E5",
            linewidths=3.5,
            edgecolors='black',
            node_size=30000,
            min_source_margin=120,
            min_target_margin=105,
            width=10,
            arrowsize=70,
            font_size=96,
            with_labels=True)

    length = .8
    axis = plt.gca()
    axis.set_xlim((-length, length))
    axis.set_ylim((-length, length))
    plt.close()

    fig.canvas.draw()
    img = Image.frombytes('RGB', fig.canvas.get_width_height(), fig.canvas.tostring_rgb())
    return img


def add_borders(img, width=5, color=(0,0,0)):
    """
    Adds borders to an image. The original image is shrunk appropriately.
    """
    size = (img.size[0] - 2*width, img.size[1] - 2*width)
    img = img.resize(size)
    return ImageOps.expand(img, border=width, fill=color)


def get_y_and_heights(text_wrapped, dimensions, margin, font):
    """
    Get the first vertical coordinate at which to draw text and the height of each line of text
    See https://stackoverflow.com/a/46220683/9263761.
    """
    ascent, descent = font.getmetrics()

    # Calculate the height needed to draw each line of text (including its bottom margin)
    line_heights = [font.getmask(text_line).getbbox()[3] + descent + margin
                    for text_line in text_wrapped]
    # The last line doesn't have a bottom margin
    line_heights[-1] -= margin

    # Total height needed
    height_text = sum(line_heights)

    # Calculate the Y coordinate at which to draw the first line of text
    y = (dimensions[1] - height_text) // 2

    # Return the first Y coordinate and a list with the height of each line
    return (y, line_heights)


def draw_centered_text(text, width=400, height=40, font='Arial.ttf', size=36, margin=2, background='white',
                       color='black'):
    """
    Returns an image containing the text at the center.
    See https://levelup.gitconnected.com/how-to-properly-calculate-text-size-in-pil-images-17a2cc6f51fd
    """
    # Create the font
    font = ImageFont.truetype(font, size)
    # New image based on the settings defined above
    img = Image.new("RGB", (width, height), color=background)
    # Interface to draw on the image
    draw_interface = ImageDraw.Draw(img)

    text_lines = text.split('\n')
    # Get the first vertical coordinate at which to draw text and the height of each line of text
    y, line_heights = get_y_and_heights(text_lines, (width, height), margin, font)

    # Draw each line of text
    for i, line in enumerate(text_lines):
        # Calculate the horizontally-centered position at which to draw this line
        line_width = font.getmask(line).getbbox()[2]
        x = ((width - line_width) // 2)

        # Draw this line
        draw_interface.text((x, y), line, font=font, fill=color)

        # Move on to the height at which the next line should be drawn at
        y += line_heights[i]

    return img


def image_grid(images, rows, cols,
               colnames=None, colname_size=48, colname_height=80,
               rownames=None, rowname_size=48, rowname_width=120, rotate_rownames=True,
               border_width=2):
    """
    Given a list of rows * cols images, returns an image with the images drawn in a grid.
    Can optionally add column and row names. By default, adds numbers for each row and column.
    If colnames or rownames are False, they are not added.
    colnames and rownames can be lists of strings.
    """
    assert len(images) == rows * cols
    if colnames is None:
        colnames = [str(i) for i in range(1, cols + 1)]
    if rownames is None:
        rownames = [str(i) for i in range(1, rows + 1)]
    if colnames:
        assert len(colnames) == cols
    if rownames:
        assert len(rownames) == rows

    sizes = np.array([img.size for img in images]).reshape(rows, cols, 2)
    widths = sizes[:, :, 0].max(0)
    heights = sizes[:, :, 1].max(1)

    width = widths.sum() + bool(rownames) * rowname_width
    height = heights.sum() + bool(colnames) * colname_height
    grid = Image.new('RGB', size=(width, height))

    x_offsets = list(itertools.accumulate(widths, initial=rowname_width if colnames else 0))
    y_offsets = list(itertools.accumulate(heights, initial=colname_height if rownames else 0))
    if rownames:
        for text, h, y in zip(rownames, heights, y_offsets):
            if rotate_rownames:
                img = draw_centered_text(str(text), height=rowname_width, width=h, size=rowname_size).rotate(90,
                                                                                                             expand=True)
            else:
                img = draw_centered_text(str(text), height=h, width=rowname_width, size=rowname_size)
            if border_width > 0:
                img = add_borders(img, border_width)
            grid.paste(img, box=(0, y))
    if colnames:
        for text, w, x in zip(colnames, widths, x_offsets):
            img = draw_centered_text(str(text), height=colname_height, width=w, size=colname_size)
            if border_width > 0:
                img = add_borders(img, border_width)
            grid.paste(img, box=(x, 0))

    for (r, c), img in zip(itertools.product(range(rows), range(cols)), images):
        if border_width > 0:
            img = add_borders(img, border_width)
        grid.paste(img, box=(x_offsets[c], y_offsets[r]))
    return grid
